'use client'

import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar } from 'lucide-react'
import { Separator } from './ui/separator'
import { useChallenge } from '@/context/challenge-context'

export function ChallengeOverview({ id }: { id: string }) {
  const { challenges } = useChallenge()

  const challenge = challenges.find((challenge) => challenge?.id === id)

  if (!challenge) {
    return (
      <main className="flex flex-col items-center flex-1">
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
        {/* <Skeleton className="w-24 h-6 mb-1 bg-muted-foreground" />
        <Skeleton className="w-16 h-4 mt-1 bg-muted-foreground" /> */}
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center flex-1">
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
            <AvatarImage src="https://github.com/gabrielccarvalho.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-between">
            <span className="text-xs font-thin">1542</span>
            <span className="text-xs font-thin">Líder</span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/gabrielccarvalho.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-between">
            <span className="text-xs font-thin">1542</span>
            <span className="text-xs font-thin">Você</span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <Calendar className="w-6 h-6 text-gray-500" />
          <div className="flex flex-col justify-between">
            <span className="text-xs font-thin">330</span>
            <span className="text-xs font-thin">dias restantes</span>
          </div>
        </div>
      </div>
      <Separator />
      {/* <h1 className="text-2xl font-bold">{challenge.title}</h1>
      <span className="font-thin text-md">{challenge.description}</span> */}
    </main>
  )
}
