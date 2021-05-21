import React from 'react'
import { ChartData, ChartOptions } from 'chart.js'
import Card from '../Card'
import { Doughnut } from 'react-chartjs-2'
import { useAppContext } from '~/context/AppContext'
import { generateChartColors } from '~/utils/functions'

const options: ChartOptions = {
  // responsive: false,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'right',
      align: 'center',
      labels: {
        boxWidth: 15,
        boxHeight: 15,
      },
    },
  },
}
const MostCommitsLanguageChart = (): JSX.Element => {
  const [data, setData] = React.useState<ChartData | null>(null)
  const appContext = useAppContext()
  const commitsLanguages = appContext.profile.commitsLanguage

  React.useEffect(() => {
    if (commitsLanguages) {
      getCommitsLanguages()
    }
    // eslint-disable-next-line
  }, [commitsLanguages])

  const getCommitsLanguages = async (): Promise<void> => {
    if (commitsLanguages) {
      const sortedCommitsLanguages = commitsLanguages.sort((a, b) => b.commits - a.commits)

      const labels = sortedCommitsLanguages.map((commitLanguage) => commitLanguage.language)
      const data = sortedCommitsLanguages.map((commitLanguage) => commitLanguage.commits)
      const colors = generateChartColors(data.length)

      const chartData: ChartData = {
        labels,
        datasets: [
          {
            data,
            fill: true,
            backgroundColor: colors,
            borderWidth: 3,
          },
        ],
      }
      setData(chartData)
    }
  }

  if (!commitsLanguages && !commitsLanguages) return <></>
  return (
    <Card className="p-4 mt-4">
      <p className="text-lg font-bold">Commits Per Language</p>
      {data ? <Doughnut type="" options={options} data={data} /> : <div></div>}
    </Card>
  )
}

export default MostCommitsLanguageChart
