import React from 'react'
import { Pie } from 'react-chartjs-2'
import Card from '../Card'
import { hexToRgb } from '~/utils/functions'
import { ChartData, ChartOptions } from 'chart.js'
import { useAppContext } from '~/context/AppContext'
import LangStatsLoader from './loader'

const options: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
      align: 'center',
    },
  },
}

const LangStats = (): JSX.Element => {
  const [chartData, setChartData] = React.useState<ChartData | null>(null)
  const appContext = useAppContext()
  const langStats = appContext.profile.langStats

  React.useEffect(() => {
    if (langStats) {
      const labels = langStats.map((stat) => stat.label)
      const data = langStats.map((stat) => stat.value)
      const colors = langStats.map((stat) => hexToRgb(stat.color, '.4'))
      const borderColors = langStats.map(() => hexToRgb('#FFF', '1'))

      const chartData: ChartData = {
        labels,
        datasets: [
          {
            data,
            fill: true,
            backgroundColor: colors,
            borderColor: borderColors,
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
      {chartData ? <Pie type="pie" options={options} data={chartData} /> : <div></div>}
    </Card>
  )
}

export default LangStats
