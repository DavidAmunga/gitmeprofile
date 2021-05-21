import { Octokit } from '@octokit/core'
import { CommitResponse } from '~/entities/CommitResponse'
import { Repo } from '~/entities/Repo'
import { CommitLanguageResponse, LanguageResponse } from '~/entities/LanguageResponse'
import mockLanguagesResponse from '~/utils/mock/mockLanguagesResponse'
import { getRandomInt } from '~/utils/functions'

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
  repos: Repo[],
  commits: CommitResponse[]
): Promise<CommitLanguageResponse[]> => {
  let commitsLanguagesResponse: CommitLanguageResponse[] = []

  // repos = repos.slice(0, 30)

  for (const repo of repos) {
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

const getUserCommitLanguages = async (
  userName: string,
  repos: Repo[],
  commits: CommitResponse[]
): Promise<CommitLanguageResponse[]> => {
  const commitsLanguageResponse = await getCommitsLanguage(userName, repos, commits)
  return commitsLanguageResponse
}

export default getUserCommitLanguages
