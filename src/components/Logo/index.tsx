type Props = {
  className?: string
}

const Logo = ({ className, ...rest }: Props): JSX.Element => {
  return (
    <div
      {...rest}
      className={`w-2/3 flex justify-evenly text-8xl font-bold text-white p-5 rounded-md bg-logo-gray border-8 border-gray-800 ${className}`}
    >
      <span>G</span>
      <span>M</span>
      <span>P</span>
    </div>
  )
}

export default Logo
