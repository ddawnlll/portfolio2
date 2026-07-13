import type { MouseEvent } from 'react'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

export type Project = {
  name: string
  kicker: string
  description: string
  language: string
  href: string
  live?: string
  tags: string[]
  art: 'kernel' | 'forge' | 'market' | 'chat' | 'blueprint' | 'motion'
}

function ProjectArt({ type }: { type: Project['art'] }) {
  if (type === 'kernel') return <svg viewBox="0 0 600 300" aria-hidden="true"><path d="M40 208C123 58 239 64 301 151s171 104 259-22" /><path d="M68 235c111-64 196-53 260 14 61 64 137 50 198-36" /><circle cx="302" cy="151" r="38" /><circle cx="302" cy="151" r="8" className="fill" /></svg>
  if (type === 'forge') return <svg viewBox="0 0 600 300" aria-hidden="true"><path d="M56 226c66-139 157-185 271-85 93 81 144 13 216-61" /><path d="M77 92c123 77 159 139 143 183" /><path d="M384 31c-24 95 19 169 129 225" /><circle cx="328" cy="143" r="15" className="fill" /></svg>
  if (type === 'market') return <svg viewBox="0 0 600 300" aria-hidden="true"><path d="M40 229c56-1 82-57 124-46s55 71 101 36 52-122 93-112 49 95 91 72 54-91 111-123" /><path d="M40 248h520M40 184h520M40 120h520M40 56h520" className="thin" /></svg>
  if (type === 'chat') return <svg viewBox="0 0 600 300" aria-hidden="true"><circle cx="148" cy="151" r="71" /><circle cx="452" cy="151" r="71" /><path d="M219 151h162M190 103c88-63 150-63 220 0M190 199c88 63 150 63 220 0" /><circle cx="148" cy="151" r="12" className="fill" /><circle cx="452" cy="151" r="12" className="fill" /></svg>
  if (type === 'blueprint') return <svg viewBox="0 0 600 300" aria-hidden="true"><rect x="74" y="53" width="172" height="194" rx="38" /><rect x="274" y="53" width="252" height="80" rx="32" /><rect x="274" y="157" width="118" height="90" rx="32" /><rect x="416" y="157" width="110" height="90" rx="32" /><path d="M105 92h108M105 121h72M304 88h147" className="thin" /></svg>
  return <svg viewBox="0 0 600 300" aria-hidden="true"><path d="M44 183c92-185 162 87 254-26s155 90 258-47" /><path d="M44 220c104-88 173 45 272-52s145 58 240-20" /><path d="M44 105c71-85 144 30 218-21s188-19 294 28" /></svg>
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const onMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <article className={`project-card project-card--${index % 3}`} onMouseMove={onMove}>
      <div className="project-card__glow" aria-hidden="true" />
      <div className="project-card__art"><ProjectArt type={project.art} /></div>
      <div className="project-card__body">
        <p className="project-card__kicker">{project.kicker}</p>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="project-card__tags"><span>{project.language}</span>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="project-card__links">
          <a href={project.href} target="_blank" rel="noreferrer">Repository <ArrowUpRight size={16} /></a>
          {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live docs <ExternalLink size={15} /></a>}
        </div>
      </div>
    </article>
  )
}
