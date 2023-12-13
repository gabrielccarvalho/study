'use client'

import Image from 'next/image'
import Link from 'next/link'
import { differenceInDays } from 'date-fns'

import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useChallenge } from '@/context/challenge-context'

export function ChallengeCard({ id }: { id: string }) {
  const { challenges } = useChallenge()

  const challenge = challenges.find((challenge) => challenge?.id === id)

  if (!challenge) {
    return (
      <div className="flex flex-col border rounded-md shadow-sm borrder-border w-72">
        <Skeleton className="h-48 rounded-b-none w-72 bg-muted-foreground" />
        <div className="flex flex-col p-2">
          <Skeleton className="w-20 h-5 my-1 bg-muted-foreground" />
          <Skeleton className="w-32 h-3 mt-1 bg-muted-foreground" />
          <div className="flex flex-col items-end gap-1 pt-4">
            <Skeleton className="w-full h-2 bg-muted-foreground" />
            <Skeleton className="w-12 h-3 bg-muted-foreground" />
          </div>
          <div className="flex w-full py-2">
            <Skeleton className="w-24 h-9 bg-muted-foreground" />
          </div>
        </div>
      </div>
    )
  }

  const duration = differenceInDays(
    new Date(challenge.end_date.seconds * 1000),
    new Date(challenge.start_date.seconds * 1000),
  )

  const daysIntoChallenge = differenceInDays(
    new Date(),
    new Date(challenge.start_date.seconds * 1000),
  )

  const progress = Math.round((daysIntoChallenge / duration) * 100)

  return (
    <div className="flex flex-col border rounded-md shadow-sm borrder-border w-72">
      <Image
        src={challenge.thumbnail}
        alt="Challenge Image"
        width={300}
        height={300}
        className="rounded-t-md"
      />
      <div className="flex flex-col p-2">
        <span className="text-lg font-bold">{challenge.title}</span>
        <span className="text-sm text-gray-500">{challenge.description}</span>
        <div className="flex flex-col items-end gap-1 pt-4">
          <Progress value={progress} />
          <span className="text-xs text-gray-500">
            {daysIntoChallenge}/{duration}
          </span>
        </div>
        <div className="flex w-full py-2">
          <Link href={`/challenge/${id}`}>
            <Button variant="default">
              <span className="text-xs">Ver Desafio</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
