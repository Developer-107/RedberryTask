import Skeleton from "./Skeleton";

export default function CourseCardSkeleton() {
  return (
    <div className="xl:h-full h-full md:h-45 border border-gray-300 md:w-full min-w-47! bg-white rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
      <div className="flex flex-col gap-2 px-1 xl:px-2 xl:pt-1 h-full">
        <Skeleton className="flex xl:min-h-25 min-h-20 w-full xl:rounded-lg rounded-t-lg relative overflow-hidden rows-span-2" />

        <div className="flex flex-col gap-1 pb-2 xl:px-0 px-2 h-full xl:pb-1">
          <div className="flex gap-1 items-center ">
            <Skeleton className="flex h-4! w-4! rounded-sm relative overflow-hidden p-1 " />
            <Skeleton className="w-10! h-2.5 mb-1.5" />
          </div>

          <Skeleton className="xl:w-full! w-40! h-3.5! " />
          <Skeleton className="xl:block! hidden! w-40! h-3.5!" />
          <Skeleton className="xl:block! hidden! w-14! h-2! mt-auto" />
        </div>
      </div>
    </div>
  );
}
