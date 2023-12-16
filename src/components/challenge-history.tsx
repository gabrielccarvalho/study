'use client'

import Link from 'next/link'
import { useChallenge } from '@/context/challenge-context'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { BookOpen } from 'lucide-react'
import { Skeleton } from './ui/skeleton'
import ptBR from 'date-fns/locale/pt-BR'

type EventType = {
  id: string
  image: string
  title: string
  date: { seconds: number }
  user_image: string
  username: string
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col w-full max-w-lg gap-2 mx-auto my-2">
      <Skeleton className="w-20 h-5" />
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-between w-full max-w-lg px-4 py-1 mx-auto rounded-md shadow-sm bg-muted"
        >
          <div className="flex flex-row items-center justify-between w-full p-1">
            <div className="flex flex-row gap-2">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex flex-col justify-around">
                <Skeleton className="w-16 h-4" />
                <Skeleton className="w-32 h-3" />
              </div>
            </div>
            <div className="flex flex-row self-end">
              <Skeleton className="w-8 h-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ChallengeHistory({ id }: { id: string }) {
  const { challenges } = useChallenge()

  const challenge = challenges.find((challenge) => challenge?.id === id)

  if (!challenge) {
    return (
      <main className="flex flex-col flex-1 p-4 bg-gray-200">
        {Array.from({ length: 5 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </main>
    )
  }

  if (!challenge.events) {
    return <div></div>
  }

  const events = challenge.events.reduce(
    (acc: { [x: string]: EventType[] }, event: EventType) => {
      const weekDay = format(new Date(event.date.seconds * 1000), 'eee', {
        locale: ptBR,
      })

      const monthDay = format(
        new Date(event.date.seconds * 1000),
        "dd 'de' LLLL",
        {
          locale: ptBR,
        },
      )

      const eventDate = `${weekDay}, ${monthDay}`

      if (!acc[eventDate]) {
        acc[eventDate] = []
      }

      acc[eventDate].push(event)

      return acc
    },
    {},
  )

  const eventsLength = Object.entries(events).map((evt) => evt).length

  if (eventsLength === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <span className="text-xl font-bold">
          Ainda não há eventos registrados nesse desafio
        </span>
        <span className="max-w-xs text-sm font-light text-center">
          Adicione um evento clicando no botão de adicionar no canto inferior
          direito!
        </span>
      </div>
    )
  }

  return (
    <main className="flex flex-col flex-1 p-4 bg-gray-200">
      {Object.entries(events).map(([date, events]: [string, any]) => (
        <div
          key={date}
          className="flex flex-col w-full max-w-lg gap-2 mx-auto my-2"
        >
          <h3 className="font-semibold text-md">{date}</h3>
          {events.map((event: EventType) => (
            <Link key={event.id} href={`/challenge/${id}/event/${event.id}`}>
              <div className="flex flex-col items-center justify-between w-full max-w-lg px-4 py-1 mx-auto bg-white rounded-md shadow-sm">
                <div className="flex flex-row items-center justify-between w-full p-1">
                  <div className="flex flex-row gap-2">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={event.image} />
                        <AvatarFallback>
                          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600">
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                        </AvatarFallback>
                      </Avatar>
                      <Avatar className="absolute bottom-0 right-0 w-5 h-5">
                        <AvatarImage src={event.user_image} />
                        <AvatarFallback>
                          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-black to-indigo-700"></div>
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col justify-between">
                      <span className="font-semibold text-md">
                        {event.title}
                      </span>
                      <span className="text-sm font-light">
                        {event.username}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row self-end">
                    <span className="text-xs font-thin">
                      {format(
                        new Date(event.date.seconds * 1000),
                        "hh:mm aaaaa'm",
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </main>
  )
}
