import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Check, Copy, Download, Github, Heart, Menu, Moon, Phone, Sun, X } from 'lucide-react'
import ContributionGarden from './components/ContributionGarden'
import ProjectCard, { type Project } from './components/ProjectCard'
import { copy, localeNames, type Locale } from './i18n'

const SoftOrb = lazy(() => import('./components/SoftOrb'))

const projectBase: Omit<Project, 'kicker' | 'description'>[] = [
  { name: 'PRAXIS', language: 'TypeScript', href: 'https://github.com/ddawnlll/praxis', live: 'https://praxis-docs-site.netlify.app', tags: ['Python SDK', 'Ed25519'], art: 'kernel' },
  { name: 'Hephaestus', language: 'TypeScript', href: 'https://github.com/ddawnlll/hephaestus', tags: ['Python', 'Shell'], art: 'forge' },
  { name: 'V7 Engine', language: 'Python', href: 'https://github.com/ddawnlll/v7-engine', tags: ['TypeScript', 'FastAPI'], art: 'market' },
  { name: 'Raycord', language: 'Rust', href: 'https://github.com/ddawnlll/raycord', tags: ['Raylib', 'Tokio'], art: 'chat' },
  { name: 'DesignForge', language: 'JavaScript', href: 'https://github.com/ddawnlll/designforge', tags: ['Playwright', 'SigLIP'], art: 'blueprint' },
  { name: 'Background Animations', language: 'HTML', href: 'https://github.com/ddawnlll/background-animations', tags: ['Canvas', 'SVG'], art: 'motion' },
]

const ease = [0.22, 1, 0.36, 1] as const
const sectionReveal = { hidden: { opacity: 0, y: 44, filter: 'blur(9px)', clipPath: 'inset(0 0 12% 0)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.85, ease } } }

function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem('yusuf-theme') ? localStorage.getItem('yusuf-theme') === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches)
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; localStorage.setItem('yusuf-theme', dark ? 'dark' : 'light'); document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#21191d' : '#f9dfe5') }, [dark])
  return [dark, setDark] as const
}

function useLocale() {
  const [locale, setLocale] = useState<Locale>(() => (localStorage.getItem('yusuf-locale') as Locale) || 'en')
  useEffect(() => { localStorage.setItem('yusuf-locale', locale); document.documentElement.lang = locale }, [locale])
  return [locale, setLocale] as const
}

function LocaleSwitch({ locale, setLocale }: { locale: Locale; setLocale: (locale: Locale) => void }) {
  return <div className="locale-switch" role="group" aria-label="Language">
    {(Object.keys(localeNames) as Locale[]).map((item) => <button key={item} className={locale === item ? 'is-active' : ''} onClick={() => setLocale(item)} aria-pressed={locale === item}>{localeNames[item]}</button>)}
  </div>
}

function Nav({ dark, setDark, locale, setLocale }: { dark: boolean; setDark: (value: boolean) => void; locale: Locale; setLocale: (locale: Locale) => void }) {
  const [open, setOpen] = useState(false)
  const t = copy[locale]
  const close = () => setOpen(false)
  return <header className="site-header">
    <a className="wordmark" href="#top" aria-label={t.nav.home}><span>Y</span> Yusuf Karaca</a>
    <button className="menu-toggle icon-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={t.nav.menu}>{open ? <X /> : <Menu />}</button>
    <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label={t.nav.menu}>
      <a href="#work" onClick={close}>{t.nav.work}</a><a href="#rhythm" onClick={close}>{t.nav.rhythm}</a><a href="#about" onClick={close}>{t.nav.about}</a><a href={`${import.meta.env.BASE_URL}rehber/`} onClick={close}>{t.nav.guide}</a>
      <LocaleSwitch locale={locale} setLocale={setLocale} />
      <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label={dark ? t.theme.toLight : t.theme.toDark}><Sun size={15} /><span className={dark ? 'theme-toggle__knob is-dark' : 'theme-toggle__knob'} /><Moon size={15} /></button>
    </nav>
  </header>
}

export default function App() {
  const [dark, setDark] = useTheme()
  const [locale, setLocale] = useLocale()
  const [copied, setCopied] = useState(false)
  const reduceMotion = useReducedMotion()
  const t = copy[locale]
  const projects = projectBase.map((project, index) => ({ ...project, kicker: t.projects[index][0], description: t.projects[index][1] }))
  async function copyPhone() { await navigator.clipboard.writeText('551 847 1095'); setCopied(true); window.setTimeout(() => setCopied(false), 2200) }

  return <MotionConfig reducedMotion="user" transition={{ ease }}>
    <div className="site-shell" id="top"><div className="atmosphere" aria-hidden="true"><i /><i /><i /></div><Nav dark={dark} setDark={setDark} locale={locale} setLocale={setLocale} />
      <main>
        <section className="hero" aria-labelledby="hero-title"><div className="hero__copy">
          <motion.div className="availability" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}><span /> {t.hero.availability}</motion.div>
          <h1 id="hero-title" className="hero__title" aria-label={t.hero.lines.join(' ')}>{t.hero.lines.map((line, index) => <span className={index === 1 || index === 3 ? 'serif-line' : ''} key={line}><motion.i initial={{ y: reduceMotion ? 0 : '115%', filter: reduceMotion ? 'none' : 'blur(10px)' }} animate={{ y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.85, delay: index * 0.18 }}>{line}</motion.i></span>)}</h1>
          <motion.p className="hero__intro" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.65 }}>{t.hero.intro}</motion.p>
          <motion.div className="hero__actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.55 }}><a className="button button--primary" href="#work">{t.hero.work} <ArrowDown size={17} /></a><a className="button button--soft" href={`${import.meta.env.BASE_URL}Yusuf-Karaca-CV.pdf`} download>{t.hero.cv} <Download size={17} /></a></motion.div>
          <motion.div className="hero__note" initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ delay: 1.08, duration: 0.75 }}><Heart size={16} fill="currentColor" /> {t.hero.note}</motion.div>
        </div><motion.div className="hero__visual" initial={{ opacity: 0, x: 48, filter: 'blur(14px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} transition={{ delay: 0.36, duration: 1.05 }}><Suspense fallback={<div className="orb-fallback" aria-hidden="true" />}><SoftOrb dark={dark} /></Suspense></motion.div><div className="hero__scroll" aria-hidden="true"><span>{t.hero.scroll}</span><i /></div></section>

        <motion.section id="work" className="section work-section" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}><div className="section-heading"><div><p className="eyebrow">{t.work.eyebrow}</p><h2>{t.work.titleA} <em>{t.work.titleB}</em>,<br />{t.work.titleC}</h2></div><p>{t.work.intro}</p></div><motion.div className="project-grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }} variants={{ show: { transition: { staggerChildren: 0.18 } } }}>{projects.map((project, index) => <motion.div key={project.name} variants={{ hidden: { opacity: 0, y: 34, filter: 'blur(8px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } } }}><ProjectCard project={project} index={index} labels={t.work} /></motion.div>)}</motion.div></motion.section>

        <motion.section id="rhythm" className="section rhythm-section" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}><div className="section-heading section-heading--compact"><div><p className="eyebrow">{t.rhythm.eyebrow}</p><h2>{t.rhythm.titleA} <em>{t.rhythm.titleB}</em></h2></div><p>{t.rhythm.intro}</p></div><ContributionGarden locale={locale} labels={t.garden} /></motion.section>

        <motion.section id="about" className="section about-section" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.14 }}><div className="about-card"><div className="about-card__portrait" aria-hidden="true"><span>YK</span><i /><i /></div><div className="about-card__copy"><p className="eyebrow">{t.about.eyebrow}</p><h2>{t.about.titleA}<br /><em>{t.about.titleB}</em></h2><p>{t.about.p1}</p><p>{t.about.p2}</p><div className="about-values">{t.about.values.map((value) => <span key={value}>{value}</span>)}</div></div></div></motion.section>

        <motion.section id="contact" className="section contact-section" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.24 }}><div className="contact-panel"><div><p className="eyebrow">{t.contact.eyebrow}</p><h2>{t.contact.titleA}<br /><em>{t.contact.titleB}</em></h2></div><div className="contact-panel__actions"><a className="button button--primary" href="tel:+905518471095"><Phone size={17} /> 551 847 1095</a><button className={copied ? 'button button--soft is-success' : 'button button--soft'} onClick={copyPhone}><AnimatePresence mode="wait" initial={false}>{copied ? <motion.span key="done" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }}><Check size={17} /> {t.contact.copied}</motion.span> : <motion.span key="copy" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }}><Copy size={17} /> {t.contact.copy}</motion.span>}</AnimatePresence></button><a className="text-link" href="https://github.com/ddawnlll" target="_blank" rel="noreferrer"><Github size={18} /> github.com/ddawnlll <ArrowUpRight size={16} /></a></div></div></motion.section>
      </main>
      <footer><span>Yusuf Karaca · 2026</span><span>{t.footer.line}</span><a href={`${import.meta.env.BASE_URL}rehber/`}>{t.footer.guide} <ArrowUpRight size={14} /></a></footer><a className="mobile-cta" href="tel:+905518471095"><Phone size={17} /> {t.contact.talk}</a>
    </div>
  </MotionConfig>
}
