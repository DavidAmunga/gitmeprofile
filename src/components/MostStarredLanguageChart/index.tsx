import React from 'react'
import { Pie } from 'react-chartjs-2'
import Card from '../Card'
import { getRandomColor, hexToRgb } from '~/utils/functions'
import { Repo } from '~/entities/Repo'
import { ChartData } from 'chart.js'
type Props = {
  repoStats: Repo[]
}
const MostStarredLanguageChart = ({ repoStats }: Props): JSX.Element => {
  const [chartData, setChartData] = React.useState<ChartData | null>(null)
  // console.log(JSON.stringify(repoStats[0]))
  React.useEffect(() => {
    const languages = new Set(
      repoStats.filter((repo) => repo.stargazers_count > 0).map((repo) => repo.language)
    )
    const labels = Array.from(languages.values()).filter((l) => l)

    const data = labels.map((lang) => {
      const repos = repoStats.filter((repo) => repo.language === lang)
      const starArr = repos.map((r) => r.stargazers_count)
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
    // eslint-disable-next-line
  }, [])

  return (
    <Card className="p-4">
      <p className="text-lg font-bold">Most Stars per Language</p>
      {chartData ? <Pie type="" data={chartData} /> : <div></div>}
    </Card>
  )
}

export default MostStarredLanguageChart
