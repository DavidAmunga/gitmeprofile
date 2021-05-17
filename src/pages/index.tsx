import Head from 'next/head'
import React from 'react'
import Input from '../components/Input'
import Logo from '../components/Logo'
import Router from 'next/router'

const Home: React.FC = () => {
  const [profile, setProfile] = React.useState<string | null>(null)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setProfile(e.target.value)
  }

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    Router.push({ pathname: '/user', query: { id: profile } })
  }
  return (
    <div className="bg-gray-1000 w-screen h-screen relative backdrop-filter backdrop-saturate-125">
      <Head>
        <title>GitMeProfile</title>
        <meta name="description" content="Neat Github Stats Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center z-2 h-4/5 space-y-4">
        <Logo />
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4">
          <Input
            name="profile"
            className="mt-4 w-2/3"
            placeholder="Enter your Github Profile Name"
            onChange={onChange}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="flex justify-center items-center space-x-2 bg-gray-800 hover:bg-gray-900 px-4 py-3 rounded-md w-2/5 text-white text-2xl focus:outline-none"
          >
            <p>Go</p>
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
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home
