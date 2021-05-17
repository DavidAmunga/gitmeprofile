import { AppProps } from 'next/app'
import '~/styles/tailwind.scss'
import 'tailwindcss/utilities.css'
import '~/styles/styles.scss'
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />
}

export default MyApp
