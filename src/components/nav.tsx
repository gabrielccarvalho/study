import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { ModeToggle } from './mode-toggle'

export function Nav() {
  return (
    <div className="flex flex-row items-center justify-between h-12 px-3 py-1 border-b shadow-md">
      <Link href="/">
        <span className="text-lg font-semibold">study</span>
      </Link>
      <div className="flex flex-row items-center gap-2">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}
