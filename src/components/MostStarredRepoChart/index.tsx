import React from 'react'
import { Pie } from 'react-chartjs-2'
import Card from '../Card'
import { getRandomColor, hexToRgb } from '~/utils/functions'
import { Repo } from '~/entities/Repo'
import { ChartData } from 'chart.js'
type Props = {
  repoStats: Repo[]
  limit?: number
}
const MostStarredRepoChart = ({ repoStats, limit = 5 }: Props): JSX.Element => {
  const [chartData, setChartData] = React.useState<ChartData | null>(null)
  React.useEffect(() => {
    const sortBy = 'stargazers_count'

    const mostStarredRepos = repoStats
      .filter((repo) => !repo.fork)
      .sort((a, b) => b[sortBy] - a[sortBy])
      .slice(0, limit)
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
    // eslint-disable-next-line
  }, [])

  return (
    <Card className="p-4">
      <p className="text-lg font-bold">Most Stars per Repo</p>
      {chartData ? <Pie type="" data={chartData} /> : <div></div>}
    </Card>
  )
}

export default MostStarredRepoChart
