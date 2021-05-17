type InputProps = {
  placeholder: string
}

const Input = ({ placeholder }: InputProps): JSX.Element => {
  return (
    <div className="mt-8 w-4/5">
      <input
        className="w-full border border-gray-300 px-3 py-4 rounded-md shadow-sm outline-none bg-gray-900 text-white focus:ring-4 focus:ring-gray-100 text-center text-3xl"
        placeholder={placeholder}
      ></input>
    </div>
  )
}

export default Input
