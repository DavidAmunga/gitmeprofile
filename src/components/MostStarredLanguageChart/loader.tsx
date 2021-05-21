import React from 'react'
import Card from '../Card'

const MostStarredLanguageChartLoader = (): JSX.Element => {
  return (
    <Card className="p-4 w-full border border-gray-600 animate-pulse">
      <div className="w-2/3 h-4 bg-gray-400" />
      <div className="w-full h-40 bg-gray-400 mt-10" />
    </Card>
  )
}

export default MostStarredLanguageChartLoader
