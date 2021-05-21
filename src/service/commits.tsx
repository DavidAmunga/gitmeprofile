import { Octokit } from '@octokit/core'
import { CommitResponse } from '~/entities/CommitResponse'
import { Repo } from '~/entities/Repo'
import mockCommitResponses from '~/utils/mock/mockCommitResponses'

const getRepoCommits = async (userName: string, repoName: string): Promise<CommitResponse[]> => {
  // console.log(repo)
  const octokit = new Octokit()
  const commitsResponse = await octokit.request(`GET /repos/${userName}/${repoName}/commits`)
  const commitStats: CommitResponse[] = commitsResponse.data.filter(
    (commitResponse: CommitResponse) => commitResponse?.author?.login.includes(userName)
  )
  // console.log(commitStats)
  return commitStats
}

const getCommitsByUser = async (userName: string, repos: Repo[]): Promise<CommitResponse[]> => {
  // Get All Repositories
  // if (process.env.NODE_ENV !== 'production') {
  //   // TODO: Get Mock Commit Responses
  // } else {

  let commitsResponse: CommitResponse[] = []

  if (process.env.NODE_ENV !== 'production') {
    commitsResponse = mockCommitResponses
  } else {
    for (const repo of repos) {
      const commits = await getRepoCommits(userName, repo.name)
      commitsResponse = commitsResponse.concat(commits)
    }
    // }
  }

  return commitsResponse
}

const getUserCommits = async (userName: string, repos: Repo[]): Promise<CommitResponse[]> => {
  const commitsResponse = await getCommitsByUser(userName, repos)
  return commitsResponse
}

export default getUserCommits
