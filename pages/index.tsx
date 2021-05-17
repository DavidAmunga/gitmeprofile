import Head from 'next/head'
import React from 'react'

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>GitMeProfile</title>
        <meta name="description" content="Neat Github Stats Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}

export default Home
