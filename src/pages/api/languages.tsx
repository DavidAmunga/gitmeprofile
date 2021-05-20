import { GhPolyglot } from 'gh-polyglot'
import { NextApiRequest, NextApiResponse } from 'next'
import { LangStat } from '~/entities/LangStats/LangStat'
import mockLangData from '~/utils/mock/mockLangData'

export default async (req: NextApiRequest, res: NextApiResponse<LangStat[]>): Promise<void> => {
  if (req.method === 'GET') {
    if (process.env.NODE_ENV !== 'production') {
      const stats = mockLangData
      res.status(200).json(stats)
    } else {
      // Github Username
      const { userName } = req.query
      const gitStats = new GhPolyglot(`${userName}`)
      gitStats.userStats((err: unknown, stats: LangStat[]) => {
        if (err) {
          console.error(err)
          res.status(400).end()
        }
        res.status(200).json(stats)
      })
    }
  }
}
