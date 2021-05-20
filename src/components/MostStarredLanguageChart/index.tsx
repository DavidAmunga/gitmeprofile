import React from 'react'
import { Pie } from 'react-chartjs-2'
import Card from '../Card'
import { getRandomColor, hexToRgb } from '~/utils/functions'
import { ChartData, ChartOptions } from 'chart.js'
import { useAppContext } from '~/context/AppContext'

const options: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
      align: 'center',
    },
  },
}

const MostStarredLanguageChart = (): JSX.Element => {
  const [chartData, setChartData] = React.useState<ChartData | null>(null)
  // console.log(JSON.stringify(repoStats[0]))
  const appContext = useAppContext()
  const repos = appContext.profile.repos

  React.useEffect(() => {
    if (repos) {
      const languages = new Set(
        repos.filter((repo) => repo.stargazers_count > 0).map((repo) => repo.language)
      )
      const labels = Array.from(languages.values()).filter((l) => l)

      const data = labels.map((lang) => {
        const _repos = repos.filter((repo) => repo.language === lang)
        const starArr = _repos.map((r) => r.stargazers_count)
        const starSum = starArr.reduce((a, b) => a + b)
        return starSum
      })

      const colors = data.map(() => hexToRgb(getRandomColor(), '.7'))
      // const borderColors = mostStarredRepos.map((repo) => hexToRgb('#000', '.4'))
      // console.log(colors)

      const chartData: ChartData = {
        labels,
        datasets: [
          {
            data,
            fill: true,
            backgroundColor: colors,
          },
        ],
      }

      setChartData(chartData)
    }

    // eslint-disable-next-line
  }, [repos])

  if (!repos) return <></>
  return (
    <Card className="p-4">
      <p className="text-lg font-bold">Most Stars per Language</p>
      {chartData ? <Pie type="" options={options} data={chartData} /> : <div></div>}
    </Card>
  )
}

export default MostStarredLanguageChart
