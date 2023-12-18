'use client'

import { useChallenge } from '@/context/challenge-context'
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

  if (
    challenges.filter((challenge) => challenge.members.includes(user.id))
      .length === 0
  ) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-32">
        <h2 className="text-xl font-semibold">Você não tem desafios!</h2>
        <p className="text-sm text-center text-muted-foreground">
          Clique no botão de adicionar para criar um novo desafio!
        </p>
      </div>
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
          return <ChallengeCard key={challenge.id} id={challenge.id} />
        })}
    </>
  )
}
