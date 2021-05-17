import * as React from 'react'

type Props = {
  className?: string
  onClick?: any
  disabled?: boolean
  children: React.ReactChild | string
  type?: string
} & React.ComponentPropsWithoutRef<'button'>

export default function Button({ onClick, className, ...rest }: Props): JSX.Element {
  return <button onClick={onClick} className={`btn ${className}`} {...rest} />
}
