import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import Card from '../Card'
import { generateChartColors } from '~/utils/functions'
import { ChartData, ChartOptions } from 'chart.js'
import { useAppContext } from '~/context/AppContext'
import MostStarredRepoChartLoader from './loader'

const options: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'left',
      align: 'center',
      labels: {
        boxWidth: 15,
        boxHeight: 15,
      },
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
        .filter((repo) => !repo.fork && repo.stargazers_count > 0)
        .sort((a, b) => b[sortBy] - a[sortBy])
        .slice(0, 5)
      const labels = mostStarredRepos.map((repo) => repo.name)
      const data = mostStarredRepos.map((repo) => repo[sortBy])
      const colors = generateChartColors(data.length)

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
    return <MostStarredRepoChartLoader />
  }
  return (
    <Card className="p-4">
      <p className="text-lg font-bold">Most Stars per Repo</p>
      {chartData ? <Doughnut type="" options={options} data={chartData} /> : <div></div>}
    </Card>
  )
}

export default MostStarredRepoChart
