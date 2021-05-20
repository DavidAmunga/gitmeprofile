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
const MostStarredRepoChart = (): JSX.Element => {
  const [chartData, setChartData] = React.useState<ChartData | null>(null)
  const appContext = useAppContext()
  const repos = appContext.profile.repos

  React.useEffect(() => {
    if (repos) {
      const sortBy = 'stargazers_count'

      const mostStarredRepos = repos
        .filter((repo) => !repo.fork)
        .sort((a, b) => b[sortBy] - a[sortBy])
        .slice(0, 5)
      const labels = mostStarredRepos.map((repo) => repo.name)
      const data = mostStarredRepos.map((repo) => repo[sortBy])
      const colors = mostStarredRepos.map(() => hexToRgb(getRandomColor(), '.7'))
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

  if (!repos) {
    return <></>
  }
  return (
    <Card className="p-4">
      <p className="text-lg font-bold">Most Stars per Repo</p>
      {chartData ? <Pie type="" options={options} data={chartData} /> : <div></div>}
    </Card>
  )
}

export default MostStarredRepoChart
