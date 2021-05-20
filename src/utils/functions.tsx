import axios from 'axios'
import { IProfile } from '~/context/AppContext'
import { LangStat } from '~/entities/LangStats/LangStat'
import { RateLimit } from '~/entities/RateLimit'
import { UserProfile } from '~/entities/UserProfile'

export function hexToRgb(hex: string, alpha: string): string {
  hex = hex.replace('#', '')
  const r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16)
  const g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16)
  const b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16)
  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'
  }
}

export const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export const getGithubData = async (userName: string): Promise<IProfile> => {
  const userProfileData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
    params: { userName: userName ?? '' },
  })
  const userProfile: UserProfile = userProfileData.data
  const langStatsData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/languages`, {
    params: { userName: userName ?? '' },
  })
  const langStats: LangStat[] = langStatsData.data
  const repoStatsData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/repositories`, {
    params: { userName: userName ?? '' },
  })
  const repoStats = repoStatsData.data
  const commitsData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/commits`, {
    params: { userName: userName ?? '', publicRepoNo: userProfile.public_repos },
  })
  const commitsStats = commitsData.data
  // console.log(userProfile)
  // console.log(langStats)
  // console.log(repoStats)
  // console.log(commitsStats)
  const _profile: IProfile = {
    profile: userProfile,
    langStats,
    repos: repoStats,
    commits: commitsStats,
  }
  return _profile
}

export const isRateLimitOk = async (): Promise<boolean> => {
  const rateLimitData = await axios.get(`https://api.github.com/rate_limit`)
  const rateLimit: RateLimit = rateLimitData.data

  if (rateLimit.resources.core.remaining < 1) {
    return false
  } else {
    return true
  }
}
