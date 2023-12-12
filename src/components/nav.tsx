import { UserButton, currentUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Suspense } from 'react'
import { Skeleton } from './ui/skeleton'

export async function Nav() {
  const user = await currentUser()
  if (!user) {
    return <></>
  }

  return (
    <div className="flex flex-row items-center justify-between flex-1 py-1 px-3 shadow-md">
      <Link href="/">
        <span className="font-semibold text-lg">study</span>
      </Link>
      <div className="flex flex-row items-center gap-2">
        <Suspense fallback={<Skeleton className="h-12 w-12 rounded-full" />}>
          <UserButton afterSignOutUrl="/" />
        </Suspense>
      </div>
    </div>
  )
}
