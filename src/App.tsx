import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Check, Copy, Download, Github, Heart, Menu, Moon, Phone, Sun, X } from 'lucide-react'
import ContributionGarden from './components/ContributionGarden'
import ProjectCard, { type Project } from './components/ProjectCard'

const SoftOrb = lazy(() => import('./components/SoftOrb'))

const projects: Project[] = [
  {
    name: 'PRAXIS',
    kicker: 'Truth kernel · v1.0',
    description: 'A local verification layer that checks whether coding agents actually completed the work they claim — with deterministic gates, evidence and signed receipts.',
    language: 'TypeScript',
    href: 'https://github.com/ddawnlll/praxis',
    live: 'https://praxis-docs-site.netlify.app',
    tags: ['Python SDK', 'Ed25519'],
    art: 'kernel',
  },
  {
    name: 'Hephaestus',
    kicker: 'Agentic systems',
    description: 'A reusable, evidence-gated improvement loop for codebases: hypothesis-driven exploration, an adversarial council and PRAXIS-backed proof.',
    language: 'TypeScript',
    href: 'https://github.com/ddawnlll/hephaestus',
    tags: ['Python', 'Shell'],
    art: 'forge',
  },
  {
    name: 'V7 Engine',
    kicker: 'Quant infrastructure',
    description: 'A contract-bounded trading monorepo spanning simulation truth, alpha discovery, policy critique and runtime execution.',
    language: 'Python',
    href: 'https://github.com/ddawnlll/v7-engine',
    tags: ['TypeScript', 'FastAPI'],
    art: 'market',
  },
  {
    name: 'Raycord',
    kicker: 'Peer-to-peer desktop',
    description: 'A Rust desktop chat with Ed25519 identities, UDP peer discovery and gossip-style message and media sync over TCP.',
    language: 'Rust',
    href: 'https://github.com/ddawnlll/raycord',
    tags: ['Raylib', 'Tokio'],
    art: 'chat',
  },
  {
    name: 'DesignForge',
    kicker: 'Design intelligence',
    description: 'An AI design engine that turns a URL and brief into an auditable redesign blueprint using visual retrieval, component taxonomy and motion planning.',
    language: 'JavaScript',
    href: 'https://github.com/ddawnlll/designforge',
    tags: ['Playwright', 'SigLIP'],
    art: 'blueprint',
  },
  {
    name: 'Background Animations',
    kicker: 'Creative coding',
    description: 'A compact collection of standalone Canvas and SVG studies, including generative Bézier-curve background experiments.',
    language: 'HTML',
    href: 'https://github.com/ddawnlll/background-animations',
    tags: ['Canvas', 'SVG'],
    art: 'motion',
  },
]

const ease = [0.22, 1, 0.36, 1] as const
const sectionReveal = {
  hidden: { opacity: 0, y: 44, filter: 'blur(9px)', clipPath: 'inset(0 0 12% 0)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.85, ease } },
}

function useTheme() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('yusuf-theme')
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem('yusuf-theme', dark ? 'dark' : 'light')
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#21191d' : '#f7eee9')
  }, [dark])
  return [dark, setDark] as const
}

function Nav({ dark, setDark }: { dark: boolean; setDark: (value: boolean) => void }) {
  const [open, setOpen] = useState(false)
  const guideHref = `${import.meta.env.BASE_URL}rehber/`
  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Yusuf Karaca, home"><span>Y</span> Yusuf Karaca</a>
      <button className="menu-toggle icon-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Open navigation">{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
        <a href="#work" onClick={close}>Work</a>
        <a href="#rhythm" onClick={close}>Rhythm</a>
        <a href="#about" onClick={close}>About</a>
        <a href={guideHref}>Rehber</a>
        <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}>
          <Sun size={15} /><span className={dark ? 'theme-toggle__knob is-dark' : 'theme-toggle__knob'} /><Moon size={15} />
        </button>
      </nav>
    </header>
  )
}

export default function App() {
  const [dark, setDark] = useTheme()
  const [copied, setCopied] = useState(false)
  const reduceMotion = useReducedMotion()
  const cvHref = `${import.meta.env.BASE_URL}Yusuf-Karaca-CV.pdf`
  const heroWords = useMemo(() => ['I build', 'systems', 'that prove', 'their own work.'], [])

  async function copyPhone() {
    await navigator.clipboard.writeText('551 847 1095')
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <MotionConfig reducedMotion="user" transition={{ ease }}>
      <div className="site-shell" id="top">
        <div className="atmosphere" aria-hidden="true"><i /><i /><i /></div>
        <Nav dark={dark} setDark={setDark} />

        <main>
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero__copy">
              <motion.div className="availability" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <span /> Open to software roles · Germany / Remote
              </motion.div>
              <h1 id="hero-title" className="hero__title" aria-label="I build systems that prove their own work.">
                {heroWords.map((line, index) => (
                  <span className={index === 1 || index === 3 ? 'serif-line' : ''} key={line}>
                    <motion.i
                      initial={{ y: reduceMotion ? 0 : '115%', filter: reduceMotion ? 'none' : 'blur(10px)' }}
                      animate={{ y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.85, delay: index * 0.18 }}
                    >{line}</motion.i>
                  </span>
                ))}
              </h1>
              <motion.p className="hero__intro" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.65 }}>
                Merhaba, I’m Yusuf — a systems and AI tooling engineer from Türkiye. I’m happiest in the quiet, difficult part of software: where architecture, evidence and care have to meet.
              </motion.p>
              <motion.div className="hero__actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.55 }}>
                <a className="button button--primary" href="#work">See the work <ArrowDown size={17} /></a>
                <a className="button button--soft" href={cvHref} download>Download CV <Download size={17} /></a>
              </motion.div>
              <motion.div className="hero__note" initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ delay: 1.08, duration: 0.75 }}>
                <Heart size={16} fill="currentColor" /> Eight years with software, and still genuinely in love with the work.
              </motion.div>
            </div>
            <motion.div className="hero__visual" initial={{ opacity: 0, x: 48, filter: 'blur(14px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} transition={{ delay: 0.36, duration: 1.05 }}>
              <Suspense fallback={<div className="orb-fallback" aria-hidden="true" />}><SoftOrb dark={dark} /></Suspense>
            </motion.div>
            <div className="hero__scroll" aria-hidden="true"><span>scroll to wander</span><i /></div>
          </section>

          <motion.section id="work" className="section work-section" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}>
            <div className="section-heading">
              <div><p className="eyebrow">Selected real projects</p><h2>Built with <em>depth</em>,<br />not decoration.</h2></div>
              <p>From agent verification to peer-to-peer systems, these are working repositories — no concept work, no invented impact numbers.</p>
            </div>
            <motion.div className="project-grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }} variants={{ show: { transition: { staggerChildren: 0.18 } } }}>
              {projects.map((project, index) => (
                <motion.div key={project.name} variants={{ hidden: { opacity: 0, y: 34, filter: 'blur(8px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } } }}>
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section id="rhythm" className="section rhythm-section" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}>
            <div className="section-heading section-heading--compact">
              <div><p className="eyebrow">2026 · live GitHub data</p><h2>A year of <em>showing up.</em></h2></div>
              <p>Commit counts and contribution activity are fetched from GitHub’s GraphQL API at build time, with the exact snapshot date shown below.</p>
            </div>
            <ContributionGarden />
          </motion.section>

          <motion.section id="about" className="section about-section" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.14 }}>
            <div className="about-card">
              <div className="about-card__portrait" aria-hidden="true"><span>YK</span><i /><i /></div>
              <div className="about-card__copy">
                <p className="eyebrow">The human behind the repositories</p>
                <h2>Soft-hearted.<br /><em>Hard-working.</em></h2>
                <p>Programming languages, operating systems and artificial intelligence are my biggest passions. When a problem takes hold, I can spend twelve hours at the computer without noticing the room get dark.</p>
                <p>But I’m not drawn to the lone-genius myth. I’m emotional, collaborative and happiest when I belong to a group — contributing, learning and caring about the people beside the code.</p>
                <div className="about-values">
                  <span>8 years in software</span><span>Based in Türkiye</span><span>Open to Germany</span>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section id="contact" className="section contact-section" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.24 }}>
            <div className="contact-panel">
              <div><p className="eyebrow">Let’s make something honest</p><h2>Need someone who<br /><em>really likes the work?</em></h2></div>
              <div className="contact-panel__actions">
                <a className="button button--primary" href="tel:+905518471095"><Phone size={17} /> 551 847 1095</a>
                <button className={copied ? 'button button--soft is-success' : 'button button--soft'} onClick={copyPhone}>
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? <motion.span key="done" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }}><Check size={17} /> Copied</motion.span> : <motion.span key="copy" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }}><Copy size={17} /> Copy number</motion.span>}
                  </AnimatePresence>
                </button>
                <a className="text-link" href="https://github.com/ddawnlll" target="_blank" rel="noreferrer"><Github size={18} /> github.com/ddawnlll <ArrowUpRight size={16} /></a>
              </div>
            </div>
          </motion.section>
        </main>

        <footer>
          <span>Yusuf Karaca · 2026</span>
          <span>Built softly, verified carefully.</span>
          <a href={`${import.meta.env.BASE_URL}rehber/`}>Nasıl yapıldı? <ArrowUpRight size={14} /></a>
        </footer>
        <a className="mobile-cta" href="tel:+905518471095"><Phone size={17} /> Let’s talk</a>
      </div>
    </MotionConfig>
  )
}
