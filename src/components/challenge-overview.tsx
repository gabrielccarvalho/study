'use client'

import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar, UserRound } from 'lucide-react'
import { Separator } from './ui/separator'
import { useChallenge } from '@/context/challenge-context'
import { useUser } from '@clerk/nextjs'

export function ChallengeOverviewHeader({ id }: { id: string }) {
  const { challenges } = useChallenge()

  const { user } = useUser()

  const challenge = challenges.find((challenge) => challenge?.id === id)

  if (!challenge || !user) {
    return (
      <main className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center w-full overflow-hidden max-h-96">
          <Skeleton className="w-full mb-2 rounded-none bg-muted-foreground aspect-[16/9]" />
        </div>
        <div className="flex flex-row items-center justify-around w-full max-w-md py-4 mx-auto">
          <div className="flex flex-row items-center gap-2">
            <Skeleton className="w-10 h-10 rounded-full bg-muted-foreground" />
            <div className="flex flex-col justify-between">
              <Skeleton className="w-12 h-3 my-1 bg-muted-foreground" />
              <Skeleton className="w-8 h-2 bg-muted-foreground" />
            </div>
          </div>

          <div className="flex flex-row items-center gap-2">
            <Skeleton className="w-10 h-10 rounded-full bg-muted-foreground" />
            <div className="flex flex-col justify-between">
              <Skeleton className="w-12 h-3 my-1 bg-muted-foreground" />
              <Skeleton className="w-8 h-2 bg-muted-foreground" />
            </div>
          </div>

          <div className="flex flex-row items-center gap-2">
            <Skeleton className="w-10 h-10 rounded-full bg-muted-foreground" />
            <div className="flex flex-col justify-between">
              <Skeleton className="w-12 h-3 my-1 bg-muted-foreground" />
              <Skeleton className="w-8 h-2 bg-muted-foreground" />
            </div>
          </div>
        </div>
        <Separator />
      </main>
    )
  }

  const userPoints = challenge.leaderBoard.find(
    (item: { user_id: string; duration: number }) => item.user_id === user.id,
  ).duration

  const leaderPoints = challenge.leaderBoard.find(
    (item: { duration: number }) =>
      item.duration ===
      Math.max(
        ...challenge.leaderBoard.map(
          (item: { duration: number }) => item.duration,
        ),
      ),
  )

  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center w-full overflow-hidden max-h-96">
        <Image
          src={challenge.thumbnail}
          alt="challenge image"
          width={1920}
          height={1080}
        />
      </div>
      <div className="flex flex-row items-center justify-around w-full max-w-md py-4 mx-auto">
        <div className="flex flex-row items-center gap-2">
          <Avatar>
            <AvatarImage src={leaderPoints.avatar} />
            <AvatarFallback>
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500">
                <UserRound className="w-6 h-6 text-white" />
              </div>
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-between">
            <span className="text-xs font-thin">{leaderPoints.duration}</span>
            <span className="text-xs font-thin">Líder</span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <Avatar>
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500">
                <UserRound className="w-6 h-6 text-white" />
              </div>
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-between">
            <span className="text-xs font-thin">{userPoints}</span>
            <span className="text-xs font-thin">Você</span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <Calendar className="w-6 h-6 text-gray-500" />
          <div className="flex flex-col justify-between">
            <span className="text-xs font-thin">
              {challenge.duration - challenge.daysIntoChallenge}
            </span>
            <span className="text-xs font-thin">dias restantes</span>
          </div>
        </div>
      </div>
      <Separator />
    </main>
  )
}
