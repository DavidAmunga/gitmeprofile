import React from 'react'
import { RateLimit } from '~/entities/RateLimit'
import Card from '../Card'

const RequestCount = (): JSX.Element => {
  const [rateLimit, setRateLimit] = React.useState<RateLimit | null>(null)
  React.useEffect(() => {
    getAvailability()
  }, [])

  const getAvailability = () => {
    fetch(`https://api.github.com/rate_limit`)
      .then((response) => response.json())
      .then((json) => {
        setRateLimit(json)
        if (json.resources.core.remaining < 1) {
          // TODO: Show Erorr
        }
      })
  }
  if (!rateLimit) {
    return <div></div>
  }
  return (
    <Card className="fixed bottom-0 right-0 m-6 flex">
      <div className="text-md text-gray-1000 dark:text-white">
        <div className="text-md font-bold">
          {rateLimit.resources.core.remaining}/{rateLimit.resources.core.limit}
        </div>
        <div>Requests Left</div>
      </div>
    </Card>
  )
}

export default RequestCount
