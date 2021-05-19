import React from 'react'
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Octokit } from '@octokit/core'
import { UserProfile } from '~/entities/UserProfile'
import Profile from '~/components/Profile'
import Header from '~/components/Header'
import * as GhPolyglot from 'gh-polyglot'
import { LangStat } from '~/entities/LangStats/LangStat'
import { Repo } from '~/entities/Repo'
import RequestCount from '~/components/RequestCount'
import LangStats from '../../components/LangStats'
import MostStarredRepoChart from '~/components/MostStarredRepoChart'
import MostStarredLanguageChart from '~/components/MostStarredLanguageChart'
import mockUserData from '~/utils/mock/mockUserData'
import mockRepoData from '~/utils/mock/mockRepoData'
import mockLangData from '~/utils/mock/mockLangData'
import CommitChart from '~/components/CommitChart'
// import CommitChart from '~/components/CommitChart'

type UserPageProps = {
  error?: string
  profile?: UserProfile
}

const UserPage = ({ error, profile }: UserPageProps): JSX.Element => {
  const [langStats, setLangStats] = React.useState<LangStat[] | null>(null)
  const [repoStats, setRepoStats] = React.useState<Repo[] | null>(null)

  // Get Language Stats
  const getLangStats = async (id: string): Promise<void> => {
    if (process.env.NODE_ENV !== 'production') {
      const stats = mockLangData
      setLangStats(stats)
    } else {
      const gitStats = new GhPolyglot(`${id}`)
      gitStats.userStats((err: unknown, stats: LangStat[]) => {
        if (err) {
          console.error(err)
        }
        setLangStats(stats)
      })
    }
  }
  const getRepoStats = async (id: string): Promise<void> => {
    let stats: Repo[]
    if (process.env.NODE_ENV !== 'production') {
      stats = mockRepoData
      setRepoStats(stats)
    } else {
      const octokit = new Octokit()
      const reposResponse = await octokit.request(`GET /users/${id}/repos?per_page=100`)
      stats = reposResponse.data
      // console.log(stats)
      setRepoStats(stats)
    }
  }

  React.useEffect(() => {
    if (profile) {
      getLangStats(profile.login)
      getRepoStats(profile.login)
    }
    // eslint-disable-next-line
  }, [profile])

  if (error && !profile) {
    return <div>User Profile not found</div>
  } else {
    return (
      <div className="w-full h-full">
        <Head>
          <title>GitMeProfile</title>
          <meta name="description" content="Neat Github Stats Profile" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="w-full md:max-w-6xl mx-auto py-4 md:py-8 px-8 md:px-1 ">
          {/* Header */}
          <Header />
          {/* Github Requests */}
          <RequestCount />

          {profile && <Profile profile={profile} />}
          <div className="flex mt-6 justify-between">
            {/* Repos per Language Stats */}
            {langStats && <LangStats langStats={langStats} />}
            {repoStats && <MostStarredLanguageChart repoStats={repoStats} />}
            {repoStats && <MostStarredRepoChart repoStats={repoStats} />}
          </div>
          <div className="h-0.5 w-full bg-gray-200 mt-4 rounded-full">
            {profile && <CommitChart profile={profile} />}
          </div>

          {/* List of Repo Stats */}
        </div>
      </div>
    )
  }
}

interface QueryProps {
  // Github Profile Username
  id?: string
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id }: QueryProps = context.query

  // Repo Stats
  // Repository stats
  try {
    // User Info
    let userProfile: UserProfile
    if (process.env.NODE_ENV !== 'production') {
      userProfile = mockUserData
    } else {
      const octokit = new Octokit()
      const userInfoResponse = await octokit.request(`GET /users/${id}`)
      userProfile = userInfoResponse.data
    }

    return {
      props: {
        profile: userProfile,
      },
    }
  } catch (error) {
    return {
      props: {
        error: 'Failed to Fetch profile',
      },
    }
  }
}

export default UserPage
