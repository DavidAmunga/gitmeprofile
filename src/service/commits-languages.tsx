import { CommitResponse } from '~/entities/CommitResponse'
import { Repo } from '~/entities/Repo'
import { CommitLanguageResponse } from '~/entities/LanguageResponse'

const getCommitsLanguage = async (
  repos: Repo[],
  commits: CommitResponse[]
): Promise<CommitLanguageResponse[]> => {
  let commitsLanguagesResponse: CommitLanguageResponse[] = []

  // repos = repos.slice(0, 30)

  for (const repo of repos) {
    const commitsLanguage: CommitLanguageResponse = {
      language: repo.language,
      commits: commits.length,
    }

    // Get Unique Commit Language Responses
    if (
      !commitsLanguagesResponse.find(
        (_commitsLanguage) => _commitsLanguage.language === repo.language
      )
    ) {
      commitsLanguagesResponse = commitsLanguagesResponse.concat(commitsLanguage)
    }
  }

  return commitsLanguagesResponse
}

const getUserCommitLanguages = async (
  repos: Repo[],
  commits: CommitResponse[]
): Promise<CommitLanguageResponse[]> => {
  const commitsLanguageResponse = await getCommitsLanguage(repos, commits)
  return commitsLanguageResponse
}

export default getUserCommitLanguages
