import Skeleton from "@/app/components/Skeleton"

export default function FilteringItemsSkeleton() {
  return (
              <div                
                className={`flex gap-1 h-10 rounded-lg p-1 px-2 cursor-pointer bg-gray-50`}
              >
                <div className="flex items-center justify-center">
                  <Skeleton className="h-4! w-29!" />
                </div>
              </div>
  )
}
