import Skeleton from "./Skeleton";

export default function CourseCardSkeleton() {
  return (
    <div className="w-full min-w-45 border border-gray-100 bg-white rounded-lg">
      <div className="flex flex-col gap-3 p-5 h-full">
        <Skeleton className="flex min-h-65.5 w-full rounded-lg relative overflow-hidden" />

        <div className="flex flex-col gap-1 pb-2 xl:px-0 px-2 h-full xl:pb-1">
          <div className="flex gap-1 items-center justify-between">
            <Skeleton className="w-10! h-2.5 mb-1.5" />
            <Skeleton className="flex h-4! w-4! rounded-sm relative overflow-hidden p-1 " />
          </div>

          <Skeleton className="w-full! h-3.5! " />
          <Skeleton className="w-40! h-3.5!" />
          <div className="flex flex-col mt-4">
          <Skeleton className="w-full! h-3!" />
          <Skeleton className="w-full! h-3! " />
          <Skeleton className="w-14! h-3! " />
          </div>
          
          
          <div className="flex mt-4 items-center justify-between">
          <Skeleton className="w-40! h-7!" />
          <Skeleton className="w-20! h-10! " />
          </div>
        </div>
      </div>
    </div>
  );
}
