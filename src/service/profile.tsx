import { Octokit } from '@octokit/core'
import { UserProfile } from '~/entities/UserProfile'
import mockUserData from '~/utils/mock/mockUserData'
const getUserProfile = async (userName: string): Promise<UserProfile> => {
  let profile: UserProfile
  if (process.env.NODE_ENV !== 'production') {
    profile = mockUserData
    return profile
  } else {
    const octokit = new Octokit()
    const userResponse = await octokit.request(`GET /users/${userName}`)
    profile = userResponse.data
    // console.log(stats)
    return profile
  }
}

export default getUserProfile
