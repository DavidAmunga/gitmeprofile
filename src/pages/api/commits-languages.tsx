import { Octokit } from '@octokit/core'
import { NextApiRequest, NextApiResponse } from 'next'
import { CommitResponse } from '~/entities/CommitResponse'
import { Repo } from '~/entities/Repo'
import { CommitLanguageResponse, LanguageResponse } from '~/entities/LanguageResponse'
import mockCommitResponses from '~/utils/mock/mockCommitResponses'
import mockLanguagesResponse from '~/utils/mock/mockLanguagesResponse'
import { getRandomInt } from '~/utils/functions'

const getRepos = async (userName: string, pageNo: number): Promise<Repo[]> => {
  // console.log(userName)
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

const getRepoLanguages = async (userName: string, repoName: string): Promise<LanguageResponse> => {
  // console.log(repo)
  const octokit = new Octokit()
  const languagesData = await octokit.request(`GET /repos/${userName}/${repoName}/languages`)
  const languageResponse: LanguageResponse = languagesData.data
  // console.log(commitStats)
  return languageResponse
}

const getCommitsLanguage = async (
  userName: string,
  publicRepoNo: number
): Promise<CommitLanguageResponse[]> => {
  let commitsLanguagesResponse: CommitLanguageResponse[] = []
  let repos: Repo[] = []

  const pageNo: number = Math.ceil(100 / publicRepoNo)

  const allReposPromises = []

  for (let i = 1; i < pageNo; i++) {
    allReposPromises.push(getRepos(userName, i))
  }
  const allRepos = await Promise.all(allReposPromises)
  repos = allRepos[0].slice(0, 30)

  for (const repo of repos) {
    const commits =
      process.env.NODE_ENV !== 'production'
        ? mockCommitResponses
        : await getRepoCommits(userName, repo.name)
    const languages =
      process.env.NODE_ENV !== 'production'
        ? mockLanguagesResponse
        : await getRepoLanguages(userName, repo.name)
    // Get First Language to be the dominant one
    const language =
      Object.keys(languages)[process.env.NODE_ENV !== 'production' ? getRandomInt(0, 4) : 0]
    const commitsLanguage: CommitLanguageResponse = { language, commits: commits.length }

    // Get Unique Commit Language Responses
    if (
      !commitsLanguagesResponse.find((_commitsLanguage) => _commitsLanguage.language === language)
    ) {
      commitsLanguagesResponse = commitsLanguagesResponse.concat(commitsLanguage)
    }
  }

  return commitsLanguagesResponse
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CommitLanguageResponse[]>
): Promise<void> => {
  if (req.method === 'GET') {
    const { userName, publicRepoNo } = req.query
    const repoNo = parseInt(publicRepoNo.toString())
    const commitsLanguageResponse = await getCommitsLanguage(userName.toString(), repoNo)
    res.status(200).json(commitsLanguageResponse)
  }
}
