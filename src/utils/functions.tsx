import axios from 'axios'
import { IProfile } from '~/context/AppContext'
import { LangStat } from '~/entities/LangStats/LangStat'
import { RateLimit } from '~/entities/RateLimit'
import { UserProfile } from '~/entities/UserProfile'
import getUserProfile from '~/service/profile'
import getUserRepos from '~/service/repositories'
import getUserRepoCommits from '~/service/commits'
import getUserLanguages from '~/service/languages'
import getUserCommitLanguages from '~/service/commits-languages'
import { CommitResponse } from '~/entities/CommitResponse'
import { Repo } from '~/entities/Repo'

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
  const userProfile: UserProfile = await getUserProfile(userName)
  const repos: Repo[] = await getUserRepos(userName)
  const langStats: LangStat[] = await getUserLanguages(repos)
  const commits: CommitResponse[] = await getUserRepoCommits(userName, repos)
  const commitsLanguages = await getUserCommitLanguages(userName, repos, commits)
  // console.log(userProfile)
  // console.log(langStats)
  // console.log(repoStats)
  // console.log(commitsStats)
  const _profile: IProfile = {
    profile: userProfile,
    langStats,
    repos: repos,
    commits: commits,
    commitsLanguage: commitsLanguages,
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

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

export const generateChartColors = (length: number): string[] => {
  const colors: string[] = []
  const chartColors = ['#EDC666', '#E16D81', '#8B64EB', '#55A2E1', '#75C87E']
  for (let i = 0; i < length; i++) {
    const color = chartColors[i > length ? getRandomInt(0, chartColors.length - 1) : i]
    colors.push(color)
  }
  return colors
}

// Configure Vercel URL in production
export const getBaseUrl = (): string => {
  let baseUrl = ''
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL_URL) {
    baseUrl = `https://${process.env.VERCEL_URL}`
  } else if (process.env.NODE_ENV !== 'production' && process.env.PUBLIC_API_URL) {
    baseUrl = process.env.PUBLIC_API_URL
  }
  return baseUrl
}
