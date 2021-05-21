import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import Card from '../Card'
import { generateChartColors } from '~/utils/functions'
import { ChartData, ChartOptions } from 'chart.js'
import { useAppContext } from '~/context/AppContext'
import LangStatsLoader from './loader'

const options: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'left',
      align: 'center',
    },
  },
}

const LangStatsChart = (): JSX.Element => {
  const [chartData, setChartData] = React.useState<ChartData | null>(null)
  const appContext = useAppContext()
  const langStats = appContext.profile.langStats

  React.useEffect(() => {
    if (langStats) {
      const labels = langStats.map((stat) => stat.label)
      const data = langStats.map((stat) => stat.value)
      const colors = generateChartColors(data.length)

      const chartData: ChartData = {
        labels,
        datasets: [
          {
            data,
            fill: true,
            backgroundColor: colors,
            borderWidth: 2,
          },
        ],
      }

      setChartData(chartData)
    }

    // eslint-disable-next-line
  }, [langStats])

  if (!langStats) return <LangStatsLoader />
  return (
    <Card className="p-4">
      <p className="text-lg font-bold">Repos per language</p>
      {chartData ? <Doughnut type="doughnut" options={options} data={chartData} /> : <div></div>}
    </Card>
  )
}

export default LangStatsChart
