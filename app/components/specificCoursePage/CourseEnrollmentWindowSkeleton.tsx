import Skeleton from '../Skeleton'

export default function CourseEnrollmentWindowSkeleton() {
  return (
    <div className='mt-21 pl-33.25 col-span-2'>
        <div className="flex flex-col gap-8">
      <Skeleton className="h-7! w-full!"/>
      <Skeleton className="h-7! w-full!"/>
      <Skeleton className="h-7! w-full!"/>

      <div className="flex items-center justify-center p-10 rounded-xl bg-white">
          <div className="flex flex-col gap-8 w-full text-gray-400">
            <div className="flex items-center justify-between font-medium">
              <Skeleton className='h-5! w-32!' />
              <Skeleton className='h-7! w-20!' />
              
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
              <Skeleton className='h-3! w-20!' />
              <Skeleton className='h-3! w-14.5!' />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className='h-3! w-20!' />
              <Skeleton className='h-3! w-14.5!' />
              </div>
            </div>

            <Skeleton
              className="p-4.25 rounded-lg w-full"
              baseColor='#EEEDFC'
              highlightColor='#dddbf9'
            />
              
              
          </div>
        </div>
        </div>
    </div>
  )
}
