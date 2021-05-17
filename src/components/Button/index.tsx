import * as React from 'react'

type Props = {
  className?: string
  onClick?: any
  disabled?: boolean
  children: React.ReactChild | string
  type?: string
} & React.ComponentPropsWithoutRef<'button'>

export default function Button({ className, ...rest }: Props): JSX.Element {
  return <button className={`btn ${className}`} {...rest} />
}
