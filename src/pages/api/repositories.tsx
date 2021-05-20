import { Octokit } from '@octokit/core'
import { NextApiRequest, NextApiResponse } from 'next'
import { Repo } from '~/entities/Repo'
import mockRepoData from '~/utils/mock/mockRepoData'

export default async (req: NextApiRequest, res: NextApiResponse<Repo[]>): Promise<void> => {
  if (req.method === 'GET') {
    let stats: Repo[]
    if (process.env.NODE_ENV !== 'production') {
      stats = mockRepoData
      res.status(200).send(stats)
    } else {
      const octokit = new Octokit()
      const { userName } = req.query
      const reposResponse = await octokit.request(`GET /users/${userName}/repos?per_page=100`)
      stats = reposResponse.data
      // console.log(stats)
      res.status(200).json(stats)
    }
  }
}
