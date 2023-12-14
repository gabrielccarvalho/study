'use client'

import Image from 'next/image'
import { useChallenge } from '@/context/challenge-context'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import { useUser } from '@clerk/nextjs'
import { Input } from './ui/input'

export function EventOverview({ id, event }: { id: string; event: string }) {
  const { challenges } = useChallenge()
  const { user } = useUser()

  const challenge = challenges.find((challenge) => challenge?.id === id)

  if (!challenge || !user) return

  const currentEvent = challenge.events.find(
    (evt: Record<string, unknown>) => evt.id === event,
  )

  return (
    <main className="flex flex-col flex-1 w-full max-w-4xl p-4 mx-auto">
      <Link href={`/challenge/${id}`}>
        <ChevronLeft className="w-8 h-8" />
      </Link>
      <div className="flex flex-col items-center w-full max-w-md mx-auto mt-2">
        <Image
          src={currentEvent.image}
          alt="event image"
          width={500}
          height={500}
          className="shadow-md rounded-t-md"
        />
        <div className="flex flex-col w-full max-w-md px-4 py-2 bg-white rounded-b-md">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <Avatar className="w-8 h-8">
                <AvatarImage src={currentEvent.user_image} />
                <AvatarFallback>
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-black to-indigo-700"></div>
                </AvatarFallback>
              </Avatar>
              <span className="ml-2 text-sm font-thin">
                {currentEvent.username}
              </span>
            </div>
            <span className="text-sm font-thin">
              {format(
                new Date(currentEvent.date.seconds * 1000),
                "hh:mm aaaaa'm'",
              )}
            </span>
          </div>
          <Separator className="my-1" />
          <div className="flex flex-col">
            <span className="font-semibold text-md">{currentEvent.title}</span>
            <span className="text-sm font-thin">
              {currentEvent.description}
            </span>
            <span className="mt-4 text-xs font-thin">
              Ativo por {currentEvent.duration} minutos
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center w-full max-w-md gap-2 p-3 mx-auto mt-2 bg-white rounded-md shadow-md">
        <Avatar className="w-7 h-7">
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback>
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-black to-indigo-700"></div>
          </AvatarFallback>
        </Avatar>
        <Input placeholder="adicione um comentário" />
      </div>
    </main>
  )
}
