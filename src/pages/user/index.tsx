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

type UserPageProps = {
  error?: string
  profile?: UserProfile
}

const UserPage = ({ error, profile }: UserPageProps): JSX.Element => {
  const [langStats, setLangStats] = React.useState<LangStat[] | null>(null)

  // Get Language Stats
  const getLangStats = async (id: string): Promise<void> => {
    const gitStats = new GhPolyglot(`${id}`)

    gitStats.userStats((err: unknown, stats: LangStat[]) => {
      if (err) {
        console.error(err)
      }
      console.log(langStats)
      setLangStats(stats)
    })
  }

  React.useEffect(() => {
    if (profile) {
      getLangStats(profile.login)
    }
    // eslint-disable-next-line
  }, [profile])

  if (error) {
    return <div>User Profile not found</div>
  }
  return (
    <div className="w-screen h-screen">
      <Head>
        <title>GitMeProfile</title>
        <meta name="description" content="Neat Github Stats Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen md:max-w-6xl mx-auto py-4 md:py-8 px-8 md:px-1 ">
        {/* Header */}
        <Header />
        {/* User Profile */}
        {profile && <Profile profile={profile} />}
        {/* User Stats */}
      </div>
    </div>
  )
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
    const octokit = new Octokit()
    const userInfoResponse = await octokit.request(`GET /users/${id}`)
    const userProfile: UserProfile = userInfoResponse.data

    const reposResponse = await octokit.request(`GET /users/${id}/repos?per_page=100`)
    const repoStats: Repo[] = reposResponse.data

    console.log(repoStats)
    return {
      props: {
        profile: userProfile,
      },
    }
  } catch (error) {
    return {
      props: {
        error: 'Failed to fetch profile',
      },
    }
  }
}

export default UserPage
