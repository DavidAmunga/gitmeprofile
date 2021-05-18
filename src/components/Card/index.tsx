import React from 'react'

type Props = {
  children: React.ReactChild | React.ReactChild[] | string
  className?: string
}

const Card = ({ children, className }: Props): JSX.Element => {
  return (
    <div
      className={`bg-white rounded-sm p-4 shadow-sm dark:bg-gray-700
  ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
