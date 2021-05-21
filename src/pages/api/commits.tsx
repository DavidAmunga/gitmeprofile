import { Octokit } from '@octokit/core'
import { NextApiRequest, NextApiResponse } from 'next'
import { CommitResponse } from '~/entities/CommitResponse'
import { Repo } from '~/entities/Repo'
import mockCommitResponses from '~/utils/mock/mockCommitResponses'

const getRepos = async (userName: string, pageNo: number): Promise<Repo[]> => {
  console.log(userName)
  const octokit = new Octokit()
  const reposResponse = await octokit.request(
    `GET /users/${userName}/repos?per_page=100&page=${pageNo}`
  )

  const repos: Repo[] = reposResponse.data.filter((repo: Repo) => !repo.fork && repo.size > 0)

  // console.log(repos)
  return repos
}

const getRepoCommits = async (userName: string, repoName: string): Promise<CommitResponse[]> => {
  // console.log(repo)
  const octokit = new Octokit()
  const commitsResponse = await octokit.request(`GET /repos/${userName}/${repoName}/commits`)
  const commitStats: CommitResponse[] = commitsResponse.data
  // console.log(commitStats)
  return commitStats
}

const getCommitsByUser = async (
  userName: string,
  publicRepoNo: number
): Promise<CommitResponse[]> => {
  // Get All Repositories
  // if (process.env.NODE_ENV !== 'production') {
  //   // TODO: Get Mock Commit Responses
  // } else {

  let commitsResponse: CommitResponse[] = []

  if (process.env.NODE_ENV !== 'production') {
    commitsResponse = mockCommitResponses
  } else {
    const pageNo: number = Math.ceil(100 / publicRepoNo)

    const allReposPromises = []

    for (let i = 1; i < pageNo; i++) {
      allReposPromises.push(getRepos(userName, i))
    }
    const allRepos = await Promise.all(allReposPromises)
    const repos = allRepos[0].slice(0, 30)
    for (const repo of repos) {
      const commits = await getRepoCommits(userName, repo.name)
      commitsResponse = commitsResponse.concat(commits)
    }
    // }
  }

  return commitsResponse
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CommitResponse[]>
): Promise<void> => {
  if (req.method === 'GET') {
    const { userName, publicRepoNo } = req.query
    const repoNo = parseInt(publicRepoNo.toString())
    const commitsResponse = await getCommitsByUser(userName.toString(), repoNo)
    res.status(200).json(commitsResponse)
  }
}