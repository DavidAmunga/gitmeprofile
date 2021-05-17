import React from 'react'
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Octokit } from '@octokit/core'
import { UserProfile } from '~/entities/UserProfile'
import Profile from '~/components/Profile'
import Header from '~/components/Header'

type UserPageProps = {
  error?: string
  profile?: UserProfile
}

const UserPage = ({ error, profile }: UserPageProps): JSX.Element => {
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
    // console.log(repoStats)
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
