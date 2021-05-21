import { Octokit } from '@octokit/core'
import { Repo } from '~/entities/Repo'
import mockRepoData from '~/utils/mock/mockRepoData'

const getRepositories = async (userName: string): Promise<Repo[]> => {
  let stats: Repo[]
  if (process.env.NODE_ENV !== 'production') {
    stats = mockRepoData
    return stats
  } else {
    const octokit = new Octokit()
    const reposResponse = await octokit.request(`GET /users/${userName}/repos?per_page=100`)
    stats = reposResponse.data.filter((repo: Repo) => !repo.fork && repo.size > 0)
    // stats = stats.slice(stats.length - 4, stats.length - 1)
    // console.log(stats)
    return stats
  }
}

export default getRepositories
