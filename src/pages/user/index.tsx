import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Profile from '~/components/Profile'
import Header from '~/components/Header'
import RequestCount from '~/components/RequestCount'
import LangStats from '../../components/LangStats'
import MostStarredRepoChart from '~/components/MostStarredRepoChart'
import MostStarredLanguageChart from '~/components/MostStarredLanguageChart'
import Footer from '~/components/Footer'
// import MostCommitsRepoChart from '~/components/MostCommitsRepoChart'
import { getGithubData, isRateLimitOk } from '~/utils/functions'
import { IProfile, useAppContext } from '~/context/AppContext'
import MostCommitsRepoChart from '~/components/MostCommitsRepoChart'

type UserPageProps = {
  profile: IProfile
  error?: string | null
}

const UserPage = ({ profile, error }: UserPageProps): JSX.Element => {
  const appContext = useAppContext()
  React.useEffect(() => {
    if (appContext && profile) {
      // Check If Initial Profile is Null
      const initialUserProfile = appContext.profile.profile
      if (!initialUserProfile) {
        appContext.setUserProfile(profile)
      }
    }
    // eslint-disable-next-line
  }, [appContext,profile])
  

  React.useEffect(() => {
    if (error) {
      Router.push({ pathname: '/', query: { error } })
    }
    // eslint-disable-next-line
  }, [error])
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
        <Profile />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 mt-6">
          {/* Repos per Language Stats */}
          <LangStats />
          <MostStarredLanguageChart />
          <MostStarredRepoChart />
        </div>
        {/* Divider */}
        <div className="h-0.5 w-full bg-gray-200 mt-4 rounded-full"></div>
        {/* <MostCommitsRepoChart /> */}
        <div className="w-full mt-6 justify-between">
          <MostCommitsRepoChart />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { userName } = context.query

  // No Github Username
  if (!userName || userName.length == 0) {
    return {
      props: {
        profile: null,
        error: 'No Github Username',
      },
    }
  }
  const rateLimitStatusData = await isRateLimitOk()
  if (!rateLimitStatusData) {
    return {
      props: {
        profile: null,
        error: 'Ooops! Rate Limit Exceeded. Try again in an hour',
      },
    }
  }
  // Repo Stats
  // Repository stats
  const profile = await getGithubData(userName.toString())
  try {
    return {
      props: {
        profile: profile,
        error: null,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        error: 'Failed to Fetch profile',
      },
    }
  }
}

export default UserPage
