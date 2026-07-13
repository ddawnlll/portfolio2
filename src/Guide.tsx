import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Code2, Database, Github, Layers3, Moon, Sparkles, Sun } from 'lucide-react'
import githubData from './data/github.json'
import { copy, localeNames, type Locale } from './i18n'

const stepIcons = [Database, Layers3, Sparkles, Code2, Github]

function useGuideState() {
  const [dark, setDark] = useState(() => localStorage.getItem('yusuf-theme') === 'dark')
  const [locale, setLocale] = useState<Locale>(() => (localStorage.getItem('yusuf-locale') as Locale) || 'en')
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; localStorage.setItem('yusuf-theme', dark ? 'dark' : 'light') }, [dark])
  useEffect(() => { localStorage.setItem('yusuf-locale', locale); document.documentElement.lang = locale }, [locale])
  return { dark, setDark, locale, setLocale }
}

export default function Guide() {
  const { dark, setDark, locale, setLocale } = useGuideState()
  const t = copy[locale]
  const g = t.guide
  return <div className="site-shell guide-page"><div className="atmosphere" aria-hidden="true"><i /><i /><i /></div>
    <header className="site-header"><a className="wordmark" href={import.meta.env.BASE_URL}><span>Y</span> Yusuf Karaca</a><div className="guide-controls"><div className="locale-switch" role="group" aria-label="Language">{(Object.keys(localeNames) as Locale[]).map((item) => <button key={item} className={locale === item ? 'is-active' : ''} onClick={() => setLocale(item)} aria-pressed={locale === item}>{localeNames[item]}</button>)}</div><button className="theme-icon icon-button" onClick={() => setDark(!dark)} aria-label={dark ? t.theme.toLight : t.theme.toDark}>{dark ? <Sun /> : <Moon />}</button></div></header>
    <main><section className="guide-hero"><a className="back-link" href={import.meta.env.BASE_URL}><ArrowLeft size={16} /> {g.back}</a><p className="eyebrow">{g.eyebrow}</p><h1>{g.titleA}<br /><em>{g.titleB}</em></h1><p>{g.intro}</p><div className="guide-stack"><span>React 19</span><span>TypeScript</span><span>Three.js</span><span>Motion</span><span>GitHub GraphQL</span><span>GitHub Pages</span></div></section>
      <section className="guide-content"><div className="guide-intro surface-panel"><span className="guide-intro__number">00</span><div><p className="eyebrow">{g.decision}</p><h2>{g.decisionTitle}</h2><p>{g.decisionText}</p></div></div><div className="guide-steps">{g.steps.map((step, index) => { const Icon = stepIcons[index]; return <article className="guide-step" key={step[0]}><div className="guide-step__icon"><Icon /></div><div><span>0{index + 1}</span><h3>{step[0]}</h3><p>{step[1]}</p></div></article> })}</div><div className="guide-note surface-panel"><p className="eyebrow">{g.transparency}</p><h2>{githubData.totals.commits} commit ≠ {githubData.totals.contributions} {t.garden.contributions}</h2><p>{locale === 'tr' ? `GitHub’ın katkı takvimi commit, issue, pull request ve bazı repository aktivitelerini birlikte sayar. Ana sayfa bu nedenle “${githubData.totals.commits} commit”, “${githubData.totals.repositories} repository” ve “${githubData.totals.contributions} tüm katkılar” sayılarını ayrı gösterir.` : locale === 'de' ? `GitHubs Beitragskalender zählt Commits, Issues, Pull Requests und einige Repository-Aktivitäten gemeinsam. Deshalb zeigt die Hauptseite „${githubData.totals.commits} Commits“, „${githubData.totals.repositories} Repositories“ und „${githubData.totals.contributions} alle Beiträge“ getrennt.` : `GitHub’s contribution calendar combines commits, issues, pull requests and some repository activity. The main page therefore shows “${githubData.totals.commits} commits”, “${githubData.totals.repositories} repositories” and “${githubData.totals.contributions} all contributions” separately.`}</p><a className="text-link" href="https://github.com/ddawnlll" target="_blank" rel="noreferrer">{g.source} <ArrowUpRight size={16} /></a></div></section>
    </main><footer><span>Yusuf Karaca · {g.footer}</span><a href={import.meta.env.BASE_URL}>{g.back} <ArrowUpRight size={14} /></a></footer>
  </div>
}
