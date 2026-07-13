import { mkdir, writeFile } from 'node:fs/promises'

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN
if (!token) throw new Error('GH_TOKEN or GITHUB_TOKEN is required')

const login = 'ddawnlll'
const now = new Date()
const year = now.getUTCFullYear()
const from = `${year}-01-01T00:00:00Z`
const to = now.toISOString()
const query = `
query($login:String!, $from:DateTime!, $to:DateTime!) {
  user(login:$login) {
    login name bio location url avatarUrl
    contributionsCollection(from:$from, to:$to) {
      totalCommitContributions totalIssueContributions totalPullRequestContributions
      totalPullRequestReviewContributions totalRepositoryContributions restrictedContributionsCount
      commitContributionsByRepository(maxRepositories:100) {
        contributions { totalCount }
        repository { name nameWithOwner url isPrivate primaryLanguage { name color } }
      }
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount color weekday } }
      }
    }
  }
}`

const response = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'yusuf-portfolio-data' },
  body: JSON.stringify({ query, variables: { login, from, to } }),
})
if (!response.ok) throw new Error(`GitHub returned ${response.status}`)
const payload = await response.json()
if (payload.errors) throw new Error(JSON.stringify(payload.errors))

const user = payload.data.user
const c = user.contributionsCollection
const data = {
  profile: { login: user.login, name: user.name, bio: user.bio, location: user.location, url: user.url, avatarUrl: user.avatarUrl },
  range: { from, to, year },
  totals: {
    commits: c.totalCommitContributions,
    contributions: c.contributionCalendar.totalContributions,
    repositories: c.commitContributionsByRepository.length,
    issues: c.totalIssueContributions,
    pullRequests: c.totalPullRequestContributions,
    reviews: c.totalPullRequestReviewContributions,
    restricted: c.restrictedContributionsCount,
  },
  repositories: c.commitContributionsByRepository.map((item) => ({
    name: item.repository.name,
    nameWithOwner: item.repository.nameWithOwner,
    url: item.repository.url,
    commits: item.contributions.totalCount,
    language: item.repository.primaryLanguage?.name || null,
    color: item.repository.primaryLanguage?.color || null,
    private: item.repository.isPrivate,
  })).sort((a, b) => b.commits - a.commits),
  days: c.contributionCalendar.weeks.flatMap((week) => week.contributionDays),
}

await mkdir(new URL('../src/data/', import.meta.url), { recursive: true })
await writeFile(new URL('../src/data/github.json', import.meta.url), JSON.stringify(data, null, 2) + '\n')
console.log(`Wrote ${data.days.length} days: ${data.totals.commits} commits across ${data.totals.repositories} repositories.`)
