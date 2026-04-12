import Skeleton from "../Skeleton";

export default function CourseInfoSkeleton() {
  return (
    <div className="flex flex-col col-span-3 gap-6">
      <Skeleton className="h-10! w-200!" />
      <div className="flex flex-col gap-4.5">
        <div className="flex flex-col gap-4">
          <Skeleton className="flex min-h-118.5! min-w-225.75! rounded-lg relative overflow-hidden" />

          <div className="flex text-gray-600 gap-3 items-center">
            <div className="flex gap-1">
              <Skeleton className="h-3! w-14!" />
            </div>

            <div className="flex gap-1">
              <Skeleton className="h-3! w-14!" />
            </div>

            <div className="ml-auto flex gap-3 items-center">
              <Skeleton className="h-3! w-14!" />

              <div
                className={`flex gap-1 h-full rounded-lg p-1 px-3 bg-gray-50`}
              >
                <div className=" flex items-center text-gray-600 justify-center">
                  <Skeleton className="h-3! w-14!" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4.5">
          <div className="self-start flex gap-1 h-10 rounded-lg p-1 px-2 cursor-pointer bg-gray-50">
            <div className="flex items-center justify-center gap-2">
              <Skeleton className="relative h-7.5! w-7.5!" />

              <Skeleton className="h-3! w-14!" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Skeleton className="h-7! w-90!" />
          <div className="flex flex-col">
            <Skeleton className="h-4! w-full!" />
            <Skeleton className="h-4! w-full!" />
            <Skeleton className="h-4! w-full!" />
            <Skeleton className="h-4! w-70!" />
          </div>
        </div>
      </div>
    </div>
  );
}
