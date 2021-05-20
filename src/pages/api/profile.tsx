import { Octokit } from '@octokit/core'
import { NextApiRequest, NextApiResponse } from 'next'
import { UserProfile } from '~/entities/UserProfile'
import mockUserData from '~/utils/mock/mockUserData'
export default async (req: NextApiRequest, res: NextApiResponse<UserProfile>): Promise<void> => {
  if (req.method === 'GET') {
    let profile: UserProfile
    if (process.env.NODE_ENV !== 'production') {
      profile = mockUserData
      res.status(200).send(profile)
    } else {
      const octokit = new Octokit()
      const { userName } = req.query
      const userResponse = await octokit.request(`GET /users/${userName}`)
      profile = userResponse.data
      // console.log(stats)
      res.status(200).json(profile)
    }
  }
}
