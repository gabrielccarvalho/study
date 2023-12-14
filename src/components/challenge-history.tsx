'use client'

import Link from 'next/link'
import { useChallenge } from '@/context/challenge-context'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { BookOpen } from 'lucide-react'

type EventType = {
  id: string
  image: string
  title: string
  date: { seconds: number }
  user_image: string
  username: string
}

export function ChallengeHistory({ id }: { id: string }) {
  const { challenges } = useChallenge()

  const challenge = challenges.find((challenge) => challenge?.id === id)

  if (!challenge) {
    return null
  }

  const groupedEvents = challenge.events.reduce(
    (acc: { [x: string]: EventType[] }, event: EventType) => {
      const eventDate = format(new Date(event.date.seconds * 1000), 'eeee')

      if (!acc[eventDate]) {
        acc[eventDate] = []
      }

      acc[eventDate].push(event)

      return acc
    },
    {},
  )

  return (
    <main className="flex flex-col flex-1 p-4 bg-gray-200">
      {/* TODO: Fix type of event */}
      {Object.entries(groupedEvents).map(([date, events]: [string, any]) => (
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
                      <span className="text-sm font-normal">{event.title}</span>
                      <span className="text-xs font-normal">
                        {event.username}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row self-end">
                    <span className="text-xs font-thin">
                      {format(new Date(event.date.seconds * 1000), 'hh:mm')}
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
