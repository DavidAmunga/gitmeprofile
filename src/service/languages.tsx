import { LangStat } from '~/entities/LangStats/LangStat'
import { Repo } from '~/entities/Repo'

const getRepoLanguages = async (repos: Repo[]): Promise<LangStat[]> => {
  // Github Username
  let langStats: LangStat[] = []
  for (const repo of repos) {
    const langStatExists = langStats.find((langStat) => langStat.language == repo.language)
    if (langStatExists) {
      langStats = langStats.map((langStat) =>
        langStat.language == repo.language
          ? { ...langStatExists, count: langStatExists.count + 1 }
          : langStat
      )
    } else {
      const langStat: LangStat = { language: repo.language, count: 1 }
      langStats = langStats.concat(langStat)
    }
  }
  return langStats
}

export default getRepoLanguages
