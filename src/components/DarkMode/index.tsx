import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const DarkMode = (): JSX.Element => {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
    // eslint-disable-next-line
   }, [])
  const switchTheme = (): void => {
    if (isMounted) {
      // console.log(theme)
      setTheme(theme === 'light' ? 'dark' : 'light')
      localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
    }
  }
  return (
    <button
      className="flex px-3 items-center justify-center cursor-pointer rounded text-gray-600  hover:text-gray-800 dark:text-gray-50 dark:text-gray-150 transition focus:outline-none outline-none"
      onClick={switchTheme}
      aria-label="Dark Mode"
    >
      {theme === 'dark' ? (
        // Moon
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
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          ></path>
        </svg>
      ) : (
        // Sun
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          ></path>
        </svg>
      )}
    </button>
  )
}

export default DarkMode
