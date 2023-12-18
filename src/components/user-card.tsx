'use client'

import { useChallenge } from '@/context/challenge-context'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { Separator } from './ui/separator'
import { Skeleton } from './ui/skeleton'

function LoadingSkeleton() {
  return (
    <div className="flex flex-col items-center w-full max-w-sm py-4 my-6 ml-6 rounded-md">
      <div className="flex flex-col items-center w-full p-4 border rounded-md shadow-lg border-muted-foreground/15">
        <Skeleton className="w-32 h-32 rounded-full" />
        <div className="flex flex-col items-center mt-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-24 h-3 mt-1" />
        </div>
      </div>
      <div className="flex flex-col items-center w-full p-4 mt-4 border rounded-md shadow-lg border-muted-foreground/15">
        <h2 className="text-xl font-semibold">Seu progresso</h2>
        <Separator className="my-2" />
        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-row items-center justify-between w-full">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-20 h-4" />
          </div>
          <div className="flex flex-row items-center justify-between w-full">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-20 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function UserCard() {
  const { user } = useUser()
  const { challenges } = useChallenge()

  if (!user) {
    return <LoadingSkeleton />
  }

  const userProgressOnEachChallenge = challenges.map((challenge) => {
    const userMinutesOnChallenge = challenge.events
      .filter((event: { user: { id: string } }) => {
        return event.user.id === user.id
      })
      .reduce((acc: number, event: { duration: number }) => {
        return acc + event.duration
      }, 0)

    return {
      challenge: challenge.title,
      progress: userMinutesOnChallenge,
    }
  })

  return (
    <div className="flex flex-col items-center w-full max-w-sm py-4 my-6 ml-6 rounded-md">
      <div className="flex flex-col items-center w-full p-4 border rounded-md shadow-lg border-muted-foreground/15">
        <Image
          src={user.imageUrl}
          alt="user avatar"
          width={128}
          height={128}
          className="rounded-full"
        />
        <div className="flex flex-col items-center mt-2">
          <h2 className="text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <span className="text-sm text-muted-foreground">
            @{user.username}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center w-full p-4 mt-4 border rounded-md shadow-lg border-muted-foreground/15">
        <h2 className="text-xl font-semibold">Seu progresso</h2>
        <Separator className="my-2" />
        <div className="flex flex-col w-full gap-2">
          {userProgressOnEachChallenge.map((challenge) => (
            <div
              key={challenge.challenge}
              className="flex flex-row items-center justify-between w-full"
            >
              <span className="text-sm">{challenge.challenge}</span>
              <span className="text-sm">{challenge.progress} minutos</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
