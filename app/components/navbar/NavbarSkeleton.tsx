import Skeleton from '../Skeleton'

export default function NavbarSkeleton() {
  return (
    <div className="flex gap-2">
                <Skeleton width={80} height={8} />
                <Skeleton width={80} height={8} />
                </div>
  )
}
