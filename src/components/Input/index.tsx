type InputProps = {
  placeholder: string
  className: string
  name: string
}

const Input = ({ placeholder, className, name }: InputProps): JSX.Element => {
  return (
    <div className={`${className}`}>
      <input
        name={name}
        className="w-full border border-gray-300 px-3 py-4 rounded-md shadow-sm outline-none bg-gray-900 text-white focus:ring-4 focus:ring-gray-100 text-center text-2xl placeholder-gray-600"
        placeholder={placeholder}
      ></input>
    </div>
  )
}

export default Input
