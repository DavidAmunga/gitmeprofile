import { Octokit } from '@octokit/core'
import React, { useEffect } from 'react'
import { CommitResponse } from '~/entities/CommitResponse'
import { Repo } from '~/entities/Repo'
import { UserProfile } from '~/entities/UserProfile'
import mockCommitDates from '~/utils/mock/mockCommitDates'
import { ChartData, ChartOptions } from 'chart.js'
import Card from '../Card'
import { Line } from 'react-chartjs-2'
interface Props {
  profile: UserProfile
}
type CommitObj = { [key: string]: any }

const options: ChartOptions = {
  // responsive: false,
  // maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
  },
}
const CommitChart = ({ profile }: Props): JSX.Element => {
  const [data, setData] = React.useState<ChartData | null>(null)
  useEffect(() => {
    getCommitsByUser()
    // eslint-disable-next-line
  }, [])

  const getRepos = async (pageNo: number): Promise<Repo[]> => {
    const octokit = new Octokit()
    const reposResponse = await octokit.request(
      `GET /users/${profile.login}/repos?per_page=100&page=${pageNo}`
    )

    const repos: Repo[] = reposResponse.data.filter((repo: Repo) => !repo.fork)

    return repos
  }

  const getRepoCommits = async (repoName: string): Promise<CommitResponse[]> => {
    // console.log(repo)
    const octokit = new Octokit()
    const commitsResponse = await octokit.request(`GET /repos/${profile.login}/${repoName}/commits`)
    const commitStats: CommitResponse[] = commitsResponse.data
    // console.log(commitStats)
    return commitStats
  }

  const getCommitsByUser = async () => {
    // Get All Repositories
    // const octokit = new Octokit()
    // const commits: CommitResponse[] = []
    let commitDates: string[] = []
    if (process.env.NODE_ENV !== 'production') {
      commitDates = mockCommitDates
    } else {
      const pageNo: number = Math.ceil(100 / profile.public_repos)

      const allReposPromises = []
      for (let i = 1; i < pageNo; i++) {
        allReposPromises.push(getRepos(i))
      }
      const allRepos = await Promise.all(allReposPromises)
      let commits: CommitResponse[] = []
      for (const repo of allRepos[0]) {
        const _commits = await getRepoCommits(repo.name)
        commits = commits.concat(_commits)
      }
      commitDates = commits.map((commit) => commit.commit.committer.date)
    }

    const groupedCommits = commitDates
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map((commit) => {
        const commitObj: CommitObj = { commit }
        return commitObj
      })
      .reduce((accu, curr) => {
        const dateObj = new Date(curr.commit)
        const monthyear = dateObj.toLocaleString('en-us', { month: 'long', year: 'numeric' })
        if (!accu[monthyear]) accu[monthyear] = 1
        else accu[monthyear]++
        // console.log(accu)
        return accu
      })

    const labels = Object.entries(groupedCommits)
      .filter((value) => value[0] !== 'commit')
      .map((date) => date[0])
    const data = Object.entries(groupedCommits)
      .filter((value) => value[0] !== 'commit')
      .map((date) => parseInt(date[1]))
    const chartData: ChartData = {
      labels,
      datasets: [
        {
          data,
          fill: true,
          backgroundColor: 'rgb(0, 0, 0,0.7)',
        },
      ],
    }
    setData(chartData)
  }

  return (
    <Card className="p-4 mt-4">
      <p className="text-lg font-bold">Commit Chart</p>
      {data ? <Line type="" options={options} data={data} /> : <div></div>}
    </Card>
  )
}

export default CommitChart
