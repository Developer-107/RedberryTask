import Skeleton from "react-loading-skeleton";

export default function ContinueLearningCardSkeleton() {
  return (
    <div className="w-full min-w-45 p-5 border border-gray-100 bg-white rounded-lg">
      <div className="flex flex-col gap-5">
        <div className="flex gap-3 h-full">
          <Skeleton className="flex min-w-35! min-h-30.5! rounded-lg relative overflow-hidden" />

          <div className="flex flex-col gap-1 h-full">
            <div className="flex gap-1 items-center justify-between text-sm font-medium">
              <p className=" text-gray-700 font-normal text-xs">
                <Skeleton className="h-3! w-25!" />
              </p>
              <Skeleton className="h-3! w-10!" />
            </div>

            <p className="mt-1 font-semibold text-gray-900 text-[20px]">
              <Skeleton className="h-5! w-45!" />
              <Skeleton className="h-5! w-25!" />
            </p>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col w-full gap-1">
            <Skeleton className="h-3! w-17!" />
            <Skeleton className="h-4! w-55!" />
          </div>
          <Skeleton className="h-11! w-17!" />
        </div>
      </div>
    </div>
  );
}
