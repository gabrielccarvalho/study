'use client'

import { useChallenge } from '@/context/challenge-context'
import { PlusIcon } from 'lucide-react'
import { ChallengeCard } from './challenge-card'
import { useUser } from '@clerk/nextjs'
import { Skeleton } from '@/components/ui/skeleton'

function LoadingSkeleton() {
  return (
    <div className="flex flex-col border rounded-md shadow-sm borrder-border w-72">
      <Skeleton className="h-48 rounded-b-none w-72" />
      <div className="flex flex-col p-2">
        <Skeleton className="w-20 h-5 my-1" />
        <Skeleton className="w-32 h-3 mt-1" />
        <div className="flex flex-col items-end gap-1 pt-4">
          <Skeleton className="w-full h-2" />
          <Skeleton className="w-12 h-3" />
        </div>
        <div className="flex w-full py-2">
          <Skeleton className="w-24 h-9" />
        </div>
      </div>
    </div>
  )
}

export function ChallengeList() {
  const { challenges } = useChallenge()
  const { user } = useUser()

  if (!user) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </>
    )
  }

  return (
    <>
      {challenges
        .filter(
          (challenge) =>
            challenge?.members.find((member: string) => member === user.id),
        )
        .map((challenge) => {
          if (!challenge) return null

          return <ChallengeCard key={challenge.id} id={challenge.id} />
        })}
      <div className="flex flex-col items-center justify-center border border-dashed rounded-md shadow-sm w-72 group hover:border-muted-foreground/80 hover:cursor-pointer">
        <PlusIcon
          className="w-16 h-16 text-muted-foreground/40 group-hover:text-muted-foreground/80"
          strokeWidth={1.2}
        />
      </div>
    </>
  )
}
