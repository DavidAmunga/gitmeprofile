import Card from '../Card'

const ProfileLoader = (): JSX.Element => {
  // console.log(format(profile.created_at, 'yyyy-MM-dd'))
  return (
    <div className="flex flex-col space-y-6 border border-gray-600 shadow rounded-md p-4 animate-pulse">
      <div className="flex w-full flex-col md:flex-row md:space-x-4 space-y-4 justify-start">
        <div className="w-32 h-32 rounded-full bg-gray-400" />
        <div className="w-full md:w-2/3 flex flex-col space-y-2">
          <div className="flex items-end">
            <div className="w-1/3 h-10 bg-gray-400" />
            <div className="w-1/3 ml-5 h-3 bg-blue-400" />
          </div>

          <div className="flex flex-col items-end space-y-2 md:space-x-4 md:flex-row md:justify-between">
            {/* Company */}
            <div className="w-1/3 h-2 bg-gray-400 dark:bg-white" />
            {/* Location */}
            <div className="w-1/3 h-2 bg-gray-400 dark:bg-white" />
            {/* Date Joined */}
            <div className="w-1/3 h-2 bg-gray-400 dark:bg-white" />
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4 justify-between">
        {/* Repositories No */}
        <Card className="px-10 py-4 flex items-center flex-col justify-center cursor-pointer">
          <div className="w-1/3 h-8 bg-gray-400" />
          <div className="mt-4 w-full h-4 bg-gray-400" />
        </Card>
        {/* Followers No */}
        <Card className="px-10 py-4 flex items-center flex-col justify-center cursor-pointer">
          <div className="w-1/3 h-8 bg-gray-400" />
          <div className="mt-4 w-full h-4 bg-gray-400" />
        </Card>
        {/* Following No */}
        <Card className="px-10 py-4 flex items-center flex-col justify-center cursor-pointer">
          <div className="w-1/3 h-8 bg-gray-400" />
          <div className="mt-4 w-full h-4 bg-gray-400" />
        </Card>
      </div>
    </div>
  )
}

export default ProfileLoader
