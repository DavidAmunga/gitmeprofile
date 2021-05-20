import React from 'react'
import { AppProps } from 'next/app'
import '~/styles/tailwind.scss'
import { ThemeProvider, useTheme } from 'next-themes'
import 'tailwindcss/utilities.css'
import '~/styles/styles.scss'
import { AppProvider } from '~/context/AppContext'
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { theme, setTheme } = useTheme()
  const [isMounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  React.useEffect(() => {
    if (isMounted) {
      console.log(theme)

      const savedTheme = localStorage.getItem('theme')

      if (savedTheme === null) {
        setTheme('light')
      } else {
        setTheme(savedTheme)
      }
    }

    // eslint-disable-next-line
   }, [])

  return (
    <AppProvider>
      <ThemeProvider defaultTheme="light" enableSystem={false} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </AppProvider>
  )
}

export default MyApp
