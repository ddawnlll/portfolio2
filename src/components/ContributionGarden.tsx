import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, GitCommitHorizontal, GitPullRequest, MessageCircleQuestion } from 'lucide-react'
import githubData from '../data/github.json'

type Day = (typeof githubData.days)[number]

const month = new Intl.DateTimeFormat('en', { month: 'short' })
const fullDate = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' })

function levelFor(count: number, max: number) {
  if (count === 0) return 0
  return Math.min(4, Math.max(1, Math.ceil((count / Math.max(max, 1)) * 4)))
}

export default function ContributionGarden() {
  const [view, setView] = useState<'garden' | 'repos'>('garden')
  const [activeDay, setActiveDay] = useState<Day | null>(null)
  const [activeRepo, setActiveRepo] = useState(githubData.repositories[0]?.name ?? '')
  const maxDay = Math.max(...githubData.days.map((day) => day.contributionCount), 1)
  const maxRepo = Math.max(...githubData.repositories.map((repo) => repo.commits), 1)

  const weeks = useMemo(() => {
    const result: Day[][] = []
    githubData.days.forEach((day, index) => {
      const week = Math.floor(index / 7)
      if (!result[week]) result[week] = []
      result[week].push(day)
    })
    return result
  }, [])

  const monthLabels = useMemo(() => {
    let previous = ''
    return weeks.map((week) => {
      const date = new Date(`${week[0]?.date}T12:00:00`)
      const current = month.format(date)
      if (current === previous) return ''
      previous = current
      return current
    })
  }, [weeks])

  return (
    <div className="garden surface-panel">
      <div className="garden__topline">
        <div>
          <p className="eyebrow">A real year, not a vanity counter</p>
          <h3>Contribution rhythm</h3>
        </div>
        <div className="segmented" role="group" aria-label="Contribution view">
          <button className={view === 'garden' ? 'is-active' : ''} onClick={() => setView('garden')} aria-pressed={view === 'garden'}>
            <CalendarDays size={16} /> Days
          </button>
          <button className={view === 'repos' ? 'is-active' : ''} onClick={() => setView('repos')} aria-pressed={view === 'repos'}>
            <GitCommitHorizontal size={16} /> Repos
          </button>
        </div>
      </div>

      <div className="contribution-totals" aria-label="GitHub contribution totals">
        <div><strong>{githubData.totals.commits}</strong><span>commits</span></div>
        <div><strong>{githubData.totals.repositories}</strong><span>repositories</span></div>
        <div><strong>{githubData.totals.contributions}</strong><span>all contributions</span></div>
      </div>

      {view === 'garden' ? (
        <motion.div className="calendar-view" key="garden" initial={{ clipPath: 'inset(0 100% 0 0)', filter: 'blur(5px)' }} animate={{ clipPath: 'inset(0 0% 0 0)', filter: 'blur(0px)' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <div className="calendar-scroll" role="group" aria-label={`${githubData.range.year} GitHub contribution calendar`}>
            <div className="month-row" style={{ gridTemplateColumns: `repeat(${weeks.length}, 14px)` }}>
              {monthLabels.map((label, index) => <span key={`${label}-${index}`}>{label}</span>)}
            </div>
            <div className="calendar-grid" style={{ gridTemplateColumns: `repeat(${weeks.length}, 14px)` }}>
              {weeks.map((week, weekIndex) => (
                <div className="calendar-week" key={weekIndex}>
                  {week.map((day) => (
                    <button
                      key={day.date}
                      className="day"
                      data-level={levelFor(day.contributionCount, maxDay)}
                      aria-label={`${fullDate.format(new Date(`${day.date}T12:00:00`))}: ${day.contributionCount} contributions`}
                      onMouseEnter={() => setActiveDay(day)}
                      onFocus={() => setActiveDay(day)}
                      onMouseLeave={() => setActiveDay(null)}
                      onBlur={() => setActiveDay(null)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="garden__feedback" aria-live="polite">
            {activeDay ? (
              <><strong>{activeDay.contributionCount} contributions</strong><span>{fullDate.format(new Date(`${activeDay.date}T12:00:00`))}</span></>
            ) : (
              <><strong>Hover or focus a day</strong><span>Every cell comes from GitHub's contribution calendar.</span></>
            )}
          </div>
          <div className="legend"><span>Quiet</span>{[0, 1, 2, 3, 4].map((level) => <i key={level} data-level={level} />)}<span>Busy</span></div>
        </motion.div>
      ) : (
        <motion.div className="repo-view" key="repos" initial={{ clipPath: 'inset(0 0 100% 0)', y: 16 }} animate={{ clipPath: 'inset(0 0 0% 0)', y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          {githubData.repositories.map((repo) => (
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className={activeRepo === repo.name ? 'repo-bar is-active' : 'repo-bar'}
              onMouseEnter={() => setActiveRepo(repo.name)}
              onFocus={() => setActiveRepo(repo.name)}
              key={repo.nameWithOwner}
            >
              <span>{repo.name}</span>
              <i style={{ '--bar': `${Math.max(4, (repo.commits / maxRepo) * 100)}%` } as React.CSSProperties} />
              <strong>{repo.commits}</strong>
            </a>
          ))}
        </motion.div>
      )}

      <div className="garden__footnote">
        <GitPullRequest size={16} /> {githubData.totals.pullRequests} pull requests
        <MessageCircleQuestion size={16} /> {githubData.totals.issues} issues
        <span>Updated {fullDate.format(new Date(githubData.range.to))}</span>
      </div>
    </div>
  )
}
