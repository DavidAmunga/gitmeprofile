import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Profile from '~/components/Profile'
import Header from '~/components/Header'
import RequestCount from '~/components/RequestCount'
import LangStatsChart from '../../components/LangStatsChart'
import MostStarredRepoChart from '~/components/MostStarredRepoChart'
import MostStarredLanguageChart from '~/components/MostStarredLanguageChart'
import Footer from '~/components/Footer'
// import MostCommitsRepoChart from '~/components/MostCommitsRepoChart'
import { getGithubData, isRateLimitOk } from '~/utils/functions'
import { IProfile, useAppContext } from '~/context/AppContext'
import MostCommitsRepoChart from '~/components/MostCommitsRepoChart'
import MostCommitsLanguageChart from '~/components/MostCommitsLanguageChart'

type UserPageProps = {
  profile: IProfile
}

const UserPage = ({ profile }: UserPageProps): JSX.Element => {
  const appContext = useAppContext()
  // const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)
  const router = useRouter()
  React.useEffect(() => {
    if (appContext && profile) {
      // Check If Initial Profile is Null
      const initialUserProfile = appContext.profile.profile
      if (!initialUserProfile) {
        getUserProfile()
        appContext.setUserProfile(profile)
      }
    }
    // eslint-disable-next-line
  }, [appContext,profile])


  React.useEffect(() => {
    getUserProfile()
    // eslint-disable-next-line
  }, [])

  const getUserProfile = async (): Promise<void> => {
    const { userName } = router.query
    // eslint-disable-next-line
    // No Github Username
    if (!userName || userName.length == 0) {
      setError('No Github Username')
      return
    }
    const rateLimitStatusData = await isRateLimitOk()
    if (!rateLimitStatusData) {
      setError('Ooops! Rate Limit Exceeded. Try again in an hour')
      return
    }
    // Repository stats
    const profile = await getGithubData(userName.toString())
    appContext.setUserProfile(profile)
  }

  React.useEffect(() => {
    if (error) {
      router.push('/')
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Repos per Language Stats */}
          <LangStatsChart />
          <MostStarredLanguageChart />
          <MostStarredRepoChart />
        </div>
        {/* Divider */}
        <div className="h-0.5 w-full bg-gray-200 mt-4 rounded-full"></div>
        {/* <MostCommitsRepoChart /> */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <MostCommitsRepoChart />
          <MostCommitsLanguageChart />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default UserPage
