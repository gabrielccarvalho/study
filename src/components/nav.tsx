import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

export function Nav() {
  return (
    <div className="flex flex-row items-center justify-between flex-1 py-1 px-3 shadow-md">
      <Link href="/">
        <span className="font-semibold text-lg">studyrats</span>
      </Link>

      <Link href="/profile">
        <Avatar className="hover:cursor-pointer">
          <AvatarImage src="https://github.com/gabrielccarvalho.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
    </div>
  )
}
