import Head from 'next/head'
import React from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Logo from '../components/Logo'

const Home: React.FC = () => {
  return (
    <div className="bg-gray-1000 w-screen h-screen relative backdrop-filter backdrop-saturate-125">
      <Head>
        <title>GitMeProfile</title>
        <meta name="description" content="Neat Github Stats Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center z-2 h-4/5">
        <Logo />
        <Input placeholder="Enter your Github Profile Name" />
        <Button className="mt-4">Go</Button>
      </div>
    </div>
  )
}

export default Home
