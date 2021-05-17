import React from 'react'
import Link from 'next/link'
import DarkMode from '../DarkMode'
import LogoHeader from '../LogoHeader'

const Header = (): JSX.Element => {
  return (
    <div className="flex justify-between items-center my-8">
      <Link href="/">
        <LogoHeader className="w-36 h-16 text-3xl hover:scale-110 cursor-pointer transform transition ease-in-out" />
      </Link>

      <div className="">
        <DarkMode />
      </div>
    </div>
  )
}

export default Header
