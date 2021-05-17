type Props = {
  className?: string
}

const LogoHeader = ({ className, ...rest }: Props): JSX.Element => {
  return (
    <div
      {...rest}
      className={`flex items-center justify-evenly font-bold text-white  rounded-md bg-logo-gray dark:bg-gray-900 border-8 border-gray-800 dark:border-gray-200 ${className}`}
    >
      <span>G</span>
      <span>M</span>
      <span>P</span>
    </div>
  )
}

export default LogoHeader
