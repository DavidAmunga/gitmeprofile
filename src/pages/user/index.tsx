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
import CommitChart from '~/components/CommitChart'

type UserPageProps = {
  error?: string
  profile?: UserProfile
}

const UserPage = ({ error, profile }: UserPageProps): JSX.Element => {
  const [langStats, setLangStats] = React.useState<LangStat[] | null>(null)
  const [repoStats, setRepoStats] = React.useState<Repo[] | null>(null)

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
  const getRepoStats = async (id: string): Promise<void> => {
    const octokit = new Octokit()
    const reposResponse = await octokit.request(`GET /users/${id}/repos?per_page=100`)
    const stats: Repo[] = reposResponse.data
    setRepoStats(stats)
    console.log(repoStats)
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
      <div className="w-screen h-screen">
        <Head>
          <title>GitMeProfile</title>
          <meta name="description" content="Neat Github Stats Profile" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="w-screen md:max-w-6xl mx-auto py-4 md:py-8 px-8 md:px-1 ">
          {/* Header */}
          <Header />
          {/* Github Requests */}
          <RequestCount />

          {profile && <Profile profile={profile} />}
          {/* Commit Chart */}
          {profile && <CommitChart profile={profile} />}
          {/* User Stats */}
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
    const octokit = new Octokit()
    const userInfoResponse = await octokit.request(`GET /users/${id}`)
    const userProfile: UserProfile = userInfoResponse.data
    // console.log(userProfile)
    // const userProfile = {
    //   login: 'DavidAmunga',
    //   id: 13674066,
    //   node_id: 'MDQ6VXNlcjEzNjc0MDY2',
    //   avatar_url: 'https://avatars.githubusercontent.com/u/13674066?v=4',
    //   gravatar_id: '',
    //   url: 'https://api.github.com/users/DavidAmunga',
    //   html_url: 'https://github.com/DavidAmunga',
    //   followers_url: 'https://api.github.com/users/DavidAmunga/followers',
    //   following_url: 'https://api.github.com/users/DavidAmunga/following{/other_user}',
    //   gists_url: 'https://api.github.com/users/DavidAmunga/gists{/gist_id}',
    //   starred_url: 'https://api.github.com/users/DavidAmunga/starred{/owner}{/repo}',
    //   subscriptions_url: 'https://api.github.com/users/DavidAmunga/subscriptions',
    //   organizations_url: 'https://api.github.com/users/DavidAmunga/orgs',
    //   repos_url: 'https://api.github.com/users/DavidAmunga/repos',
    //   events_url: 'https://api.github.com/users/DavidAmunga/events{/privacy}',
    //   received_events_url: 'https://api.github.com/users/DavidAmunga/received_events',
    //   type: 'User',
    //   site_admin: false,
    //   name: 'David Amunga',
    //   company: 'Identigate',
    //   blog: 'https://davidamunga.com',
    //   location: 'Nairobi',
    //   email: null,
    //   hireable: true,
    //   bio: 'Form follows function. ⚡️ Web and Mobile Engineer 💻',
    //   twitter_username: 'davidamunga_',
    //   public_repos: 55,
    //   public_gists: 0,
    //   followers: 25,
    //   following: 8,
    //   created_at: '2015-08-06T07:17:10Z',
    //   updated_at: '2021-05-13T08:17:48Z',
    // }
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
