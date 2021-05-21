import React from 'react'

const Footer = (): JSX.Element => {
  return (
    <div className="fixed w-full bottom-0 left-0 bg-white dark:bg-gray-800 p-2 flex justify-center border-t-2 border-gray-200 dark:border-gray-600">
      <div className="text-center">
        GitMeProfile is built with{' '}
        <a className="text-blue-600" href="https://nextjs.com">
          Next.JS
        </a>
        ,
        <a className="text-blue-600" href="https://tailwindcss.com">
          TailwindCSS{' '}
        </a>
        ,
        <a className="text-blue-600" href="https://github.com/octokit/rest.js/">
          Octokit{' '}
        </a>{' '}
        and{' '}
        <a className="text-blue-600" href="https://www.chartjs.org/">
          Chart.JS{' '}
        </a>
        . Source is on{' '}
        <a className="text-blue-600" href="https://github.com/DavidAmunga/gitmeprofile">
          Github
        </a>
      </div>
    </div>
  )
}

export default Footer
