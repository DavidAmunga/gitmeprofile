import React from 'react'
import { LangStat } from '~/entities/LangStats/LangStat'
import { Pie } from 'react-chartjs-2'
import Card from '../Card'
import { hexToRgb } from '~/utils/functions'
import { ChartData, ChartOptions } from 'chart.js'

type Props = {
  langStats: LangStat[]
}
const options: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
      align: 'center',
    },
  },
}

const LangStats = ({ langStats }: Props): JSX.Element => {
  const [chartData, setChartData] = React.useState<ChartData | null>(null)
  React.useEffect(() => {
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
    // eslint-disable-next-line
  }, [])

  return (
    <Card className="p-4">
      <p className="text-lg font-bold">Repos per language</p>
      {chartData ? <Pie type="" options={options} data={chartData} /> : <div></div>}
    </Card>
  )
}

export default LangStats
