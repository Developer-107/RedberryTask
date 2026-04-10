import Skeleton from "../Skeleton";

export default function CourseCardSkeletonInCourses() {
  return (
    <div className="w-full min-w-93.25 border border-gray-100 bg-white rounded-lg">
          <div className="flex flex-col gap-3 p-5 h-full">
            <Skeleton className="flex min-h-45.25 min-w-83.25 rounded-lg relative overflow-hidden" />
    
            <div className="flex flex-col gap-1 pb-2 xl:px-0 px-2 h-full xl:pb-1">
              <div className="flex gap-1 items-center justify-between">
                <Skeleton className="w-10! h-2.5 mb-1.5" />
                <Skeleton className="flex h-4! w-4! rounded-sm relative overflow-hidden p-1 " />
              </div>
    
              <Skeleton className="w-full! h-3.5! " />
              <Skeleton className="w-40! h-3.5!" />
              <div className="flex flex-col mt-4">
              <div className=" self-start text-gray-500 mt-3 mb-4">
              <div
                className={`flex gap-1 h-full rounded-lg p-1 px-3 bg-gray-50`}
              >
                <div className=" flex items-center text-gray-600 justify-center">
                  <p><Skeleton className="h-3! w-25!"/></p>
                </div>
              </div>
          </div>
              
              </div>
              
              
              <div className="flex mt-4 items-center justify-between">
                <div className="flex flex-col">
              <Skeleton className="w-20! h-2!" />
              <Skeleton className="w-40! h-4.5!" />
              </div>
              <Skeleton className="w-20! h-10! " />
              </div>
            </div>
          </div>
        </div>
  )
}
