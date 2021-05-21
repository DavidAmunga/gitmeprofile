import { LangStat } from '~/entities/LangStats/LangStat'
import { Repo } from '~/entities/Repo'
import mockLangData from '~/utils/mock/mockLangData'

const getLanguages = async (repos: Repo[]): Promise<LangStat[]> => {
  if (process.env.NODE_ENV !== 'production') {
    const stats = mockLangData
    return stats
  } else {
    // Github Username
    let langStats: LangStat[] = []
    for (const repo of repos) {
      const langStatExists = langStats.find((langStat) => (langStat.language = repo.language))
      if (langStatExists) {
        langStatExists.count++
        langStats = langStats.map((langStat) =>
          langStat.language == repo.language ? langStatExists : langStat
        )
      } else {
        const langStat: LangStat = { language: repo.name, count: 1 }
        langStats.push(langStat)
      }
    }
    return langStats
  }
}

export default getLanguages
