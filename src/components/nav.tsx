import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Suspense } from 'react'
import { Skeleton } from './ui/skeleton'

export async function Nav() {
  return (
    <div className="flex flex-row items-center justify-between flex-1 px-3 py-1 shadow-md">
      <Link href="/">
        <span className="text-lg font-semibold">study</span>
      </Link>
      <div className="flex flex-row items-center gap-2">
        <Suspense fallback={<Skeleton className="w-12 h-12 rounded-full" />}>
          <UserButton afterSignOutUrl="/" />
        </Suspense>
      </div>
    </div>
  )
}
