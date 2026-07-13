import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const forbidden = ['transition-all', 'scale-105']
const files = []
async function walk(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, item.name)
    if (item.isDirectory()) await walk(path)
    else if (/\.(css|tsx|ts)$/.test(item.name)) files.push(path)
  }
}
await walk(fileURLToPath(new URL('../src', import.meta.url)))
for (const file of files) {
  const text = await readFile(file, 'utf8')
  for (const pattern of forbidden) if (text.includes(pattern)) throw new Error(`${pattern} found in ${file}`)
}
console.log(`Pattern audit passed across ${files.length} source files.`)
