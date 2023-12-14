'use client'

import Image from 'next/image'
import Link from 'next/link'
import { format, formatDistance } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { ChevronLeft } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useChallenge } from '@/context/challenge-context'
import { Input } from '@/components/ui/input'

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
              <span className="ml-2 text-md">{currentEvent.username}</span>
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
            <span className="text-lg font-semibold">{currentEvent.title}</span>
            <span className="font-thin text-md">
              {currentEvent.description}
            </span>
            <span className="mt-2 text-xs font-thin">
              Ativo por {currentEvent.duration} minutos
            </span>
          </div>
        </div>
      </div>
      {currentEvent.comments &&
        currentEvent.comments.map(
          (comment: {
            id: string
            user_image: string | undefined
            username: string
            content: string
            created_at: { seconds: number }
          }) => {
            return (
              <div
                key={comment.id}
                className="flex flex-row w-full max-w-md gap-2 p-2 mx-auto mt-2 bg-white rounded-md shadow-md"
              >
                <Avatar className="w-7 h-7">
                  <AvatarImage src={comment.user_image} />
                  <AvatarFallback>
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-black to-indigo-700"></div>
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-between">
                  <span className="text-sm font-semibold">
                    {comment.username}
                  </span>
                  <span className="text-sm font-light">{comment.content}</span>
                  <span className="mt-2 text-xs font-thin">
                    {formatDistance(
                      new Date(comment.created_at.seconds * 1000),
                      new Date(),
                      { addSuffix: true, locale: ptBR },
                    )}
                  </span>
                </div>
              </div>
            )
          },
        )}
      <div className="flex flex-row items-center w-full max-w-md gap-2 p-2 mx-auto mt-2 bg-white rounded-md shadow-md">
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
