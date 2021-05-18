import { Octokit } from '@octokit/core'
import React, { useEffect } from 'react'
import { CommitResponse } from '~/entities/CommitResponse'
import { Repo } from '~/entities/Repo'
import { UserProfile } from '~/entities/UserProfile'

interface Props {
  profile: UserProfile
}
const CommitChart = ({ profile }: Props): JSX.Element => {
  useEffect(() => {
    getCommitsByUser()
  })

  const getCommitsByUser = async () => {
    // Get All Repositories
    const octokit = new Octokit()
    const commits: CommitResponse[] = []
    const pageNo: number = Math.ceil(100 / profile.public_repos)
    for (let i = 1; i < pageNo; i++) {
      const reposResponse = await octokit.request(
        `GET /users/${profile.login}/repos?per_page=100&page=${i}`
      )
      const repoStats: Repo[] = reposResponse.data
      for (const repo of repoStats.slice()) {
        // console.log(repo)
        const octokit = new Octokit()
        const commitsResponse = await octokit.request(
          `GET /repos/${profile.login}/${repo.name}/commits`
        )
        const commitStats: CommitResponse[] = commitsResponse.data
        // console.log(commitStats)
        commitStats[0].committer.date
        commits.push(...commitStats)
      }
    }
    // const groupedCommits = commits.reduce((accu: CommitResponse, curr: CommitResponse) => {
    //   console.log(accu.committer.date)

    //   const dateObj = new Date(curr.committer.date)
    //   const monthyear = dateObj.toLocaleString('en-us', { month: 'long', year: 'numeric' })
    //   // if (!accu[monthyear]) accu[monthyear] = { monthyear, entries: 1 }
    //   // else accu[monthyear].entries++
    //   return accu
    // })
    // console.log(groupedCommits)
  }

  return <div>Commit Chart</div>
}

export default CommitChart
