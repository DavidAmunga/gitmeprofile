import React from 'react'
import { ChartData, ChartOptions } from 'chart.js'
import Card from '../Card'
import { Pie } from 'react-chartjs-2'
import { useAppContext } from '~/context/AppContext'
import { getRandomColor, hexToRgb } from '~/utils/functions'

type RepoCommits = {
  count: number
  repoName: string
}
const options: ChartOptions = {
  // responsive: false,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      align: 'start',
    },
  },
}
const MostCommitsRepoChart = (): JSX.Element => {
  const [data, setData] = React.useState<ChartData | null>(null)
  const appContext = useAppContext()
  const commits = appContext.profile.commits
  const repos = appContext.profile.repos

  React.useEffect(() => {
    if (commits && repos) {
      getCommitsByUser()
    }
    // eslint-disable-next-line
  }, [commits])

  const getCommitsByUser = async (): Promise<void> => {
    // Get All Repositories
    // if (process.env.NODE_ENV !== 'production') {
    //   // TODO: Get Mock Commit Responses
    // } else {
    const repoCommits: RepoCommits[] = []
    if (repos && commits) {
      for (const repo of repos) {
        // Get Commit For Repo
        const _commits = commits.filter((commit) => commit.url.includes(repo.name))

        const repoCommit: RepoCommits = { count: _commits.length, repoName: repo.name }
        repoCommits.push(repoCommit)
      }
      // }

      const sortedRepoCommits = repoCommits.sort((a, b) => b.count - a.count)

      const labels = sortedRepoCommits.map((repoCommit) => repoCommit.repoName)
      const data = sortedRepoCommits.map((repoCommit) => repoCommit.count)
      const colors = sortedRepoCommits.map(() => hexToRgb(getRandomColor(), '0.4'))

      const chartData: ChartData = {
        labels,
        datasets: [
          {
            data,
            fill: true,
            backgroundColor: colors,
          },
        ],
      }
      setData(chartData)
    }
  }

  if (!commits && !repos) return <></>
  return (
    <Card className="p-4 mt-4">
      <p className="text-lg font-bold">Commits Per Repo (Top 10)</p>
      {data ? <Pie type="" options={options} data={data} /> : <div></div>}
    </Card>
  )
}

export default MostCommitsRepoChart
