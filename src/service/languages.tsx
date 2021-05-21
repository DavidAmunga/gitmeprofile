import GhPolyglot from 'gh-polyglot'
import { LangStat } from '~/entities/LangStats/LangStat'
import mockLangData from '~/utils/mock/mockLangData'

const getLanguages = async (userName: string): Promise<LangStat[]> => {
  if (process.env.NODE_ENV !== 'production') {
    const stats = mockLangData
    return stats
  } else {
    // Github Username
    const gitStats = new GhPolyglot(`${userName}`)
    return gitStats.userStats((err: unknown, stats: LangStat[]) => {
      if (err) {
        console.error(err)
        // throw new Error(err)
      }
      return stats
    })
  }
}

export default getLanguages
