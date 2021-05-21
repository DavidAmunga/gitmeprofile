import { format, parseISO } from 'date-fns'
import { Twitter } from 'react-feather'
import { useAppContext } from '~/context/AppContext'
import Card from '../Card'
import ProfileLoader from './loader'

const Profile = (): JSX.Element => {
  // console.log(format(profile.created_at, 'yyyy-MM-dd'))
  const appContext = useAppContext()
  const profile = appContext.profile.profile
  if (!profile) {
    return <ProfileLoader />
  }
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 w-full">
        <img
          width={150}
          alt={`Profile for ${profile.name}`}
          className="rounded-full border-8 border-gray-1000 dark:border-gray-200"
          src={profile.avatar_url}
        />
        <div className="w-full md:w-2/3 flex flex-col space-y-2">
          <h1>
            {profile.name ?? profile.login}{' '}
            <a
              href={profile.html_url}
              target="_blank"
              className="text-base font-light italic text-blue-600 cursor-pointer"
              rel="noreferrer"
            >
              @{profile.login}
            </a>
          </h1>

          <p className="py-4">{profile.bio}</p>
          <div className="grid grid-flow-col auto-cols-max space-y-2 md:space-x-4 md:flex-row md:justify-between">
            {/* Company */}
            {profile.company && (
              <div className="text-base space-x-2 flex items-center text-gray-1000 dark:text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <div>{profile.company}</div>
              </div>
            )}
            {/* Location */}
            {profile.location && (
              <div className="text-base space-x-2 flex items-center text-gray-1000 dark:text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <div>{profile.location}</div>
              </div>
            )}
            {/* Date Joined */}
            <div className="text-base space-x-2 flex items-center text-gray-1000 dark:text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>{' '}
              <div>{format(parseISO(profile.created_at.toString()), 'do MMM yyyy')}</div>
            </div>

            {/* Twitter */}
            {profile.twitter_username && (
              <a
                href={`https://twitter.com/${profile.twitter_username}`}
                target="_blank"
                className="text-base space-x-2 flex items-center text-gray-1000 dark:text-white"
                rel="noreferrer"
              >
                <Twitter />
                <div>{profile.twitter_username}</div>
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-12">
        {/* Repositories No */}
        <Card className="px-10 py-4 cursor-pointer">
          <a
            className="flex flex-col items-center"
            href={`${profile.html_url}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="text-gray-1000 dark:text-white font-bold text-3xl">
              {profile.public_repos}
            </div>
            <div className="tracking-wider text-gray-400 text-md">REPOSITORIES</div>
          </a>
        </Card>
        {/* Followers No */}
        <Card className="px-10 py-4 cursor-pointer">
          <a
            className="flex flex-col items-center"
            href={`${profile.html_url}?tab=followers`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="text-gray-1000 dark:text-white font-bold text-3xl">
              {profile.followers}
            </div>
            <div className="tracking-wider text-gray-400 text-md">FOLLOWERS</div>
          </a>
        </Card>
        <Card className="px-10 py-4 cursor-pointer">
          <a
            className="flex flex-col items-center"
            href={`${profile.html_url}?tab=following`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="text-gray-1000 dark:text-white font-bold text-3xl">
              {profile.following}
            </div>
            <div className="tracking-wider text-gray-400 text-md">FOLLOWING</div>
          </a>
        </Card>
      </div>
    </div>
  )
}

export default Profile
