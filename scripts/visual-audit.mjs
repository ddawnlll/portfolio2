import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright-core'

const base = process.env.AUDIT_URL || 'http://127.0.0.1:5173'
const executablePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
await mkdir(new URL('../artifacts/', import.meta.url), { recursive: true })

const browser = await chromium.launch({ executablePath, headless: true })
const consoleErrors = []
const results = []

for (const test of [
  { name: 'home-desktop', path: '/', width: 1440, height: 1000 },
  { name: 'home-mobile', path: '/', width: 390, height: 844 },
  { name: 'guide-desktop', path: '/rehber/', width: 1280, height: 900 },
]) {
  const page = await browser.newPage({ viewport: { width: test.width, height: test.height }, deviceScaleFactor: 1 })
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(`${test.name}: ${message.text()}`) })
  page.on('pageerror', (error) => consoleErrors.push(`${test.name}: ${error.message}`))
  await page.goto(`${base}${test.path}`, { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += Math.max(innerHeight * 0.72, 400)) {
      scrollTo({ top: y, behavior: 'instant' })
      await new Promise((resolve) => setTimeout(resolve, 160))
    }
    scrollTo({ top: 0, behavior: 'instant' })
  })
  await page.waitForTimeout(1000)
  await page.screenshot({ path: new URL(`../artifacts/${test.name}.png`, import.meta.url).pathname.slice(1), fullPage: true })
  results.push(await page.evaluate((name) => {
    const touchTargets = [...document.querySelectorAll('button, a')]
      .map((node) => ({ label: node.textContent?.trim().slice(0, 30), rect: node.getBoundingClientRect() }))
      .filter((item) => item.rect.width > 0 && item.rect.height > 0 && (item.rect.width < 44 || item.rect.height < 44))
    return {
      name,
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      overflow: document.documentElement.scrollWidth > innerWidth,
      smallTargets: innerWidth <= 620 ? touchTargets.slice(0, 8).map((item) => `${item.label}: ${Math.round(item.rect.width)}x${Math.round(item.rect.height)}`) : [],
      title: document.title,
    }
  }, test.name))
  await page.close()
}

const dark = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
await dark.addInitScript(() => localStorage.setItem('yusuf-theme', 'dark'))
await dark.goto(`${base}/`, { waitUntil: 'networkidle' })
await dark.waitForTimeout(1500)
await dark.screenshot({ path: new URL('../artifacts/home-dark.png', import.meta.url).pathname.slice(1), fullPage: false })
await dark.close()
await browser.close()

console.log(JSON.stringify({ results, consoleErrors }, null, 2))
if (results.some((item) => item.overflow) || consoleErrors.length) process.exitCode = 1
