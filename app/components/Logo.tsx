import { RocketIcon } from 'lucide-react'

interface LogoProps {
  contentSize?: number;
}

export default function Logo({ contentSize = 24 }: LogoProps) {
  return (
    <div className={`flex items-center justify-center rounded-xl p-3.75 bg-[#4F46E5]`}>
        <RocketIcon color="white" size={contentSize} />
      </div>
  )
}
