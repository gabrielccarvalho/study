'use client'

import { useChallenge } from '@/context/challenge-context'
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import { Trophy, UserRound } from 'lucide-react'

export function ChallengeEventList({ id }: { id: string }) {
  const { challenges } = useChallenge()

  const challenge = challenges.find((challenge) => challenge?.id === id)

  if (!challenge) return

  return (
    <main className="flex flex-col items-center flex-1">
      {challenge.leaderBoard
        .sort(
          (a: { duration: number }, b: { duration: number }) =>
            b.duration - a.duration,
        )
        .map(
          (
            item: {
              user_id: string
              duration: number
              avatar: string
              username: string
            },
            index: number,
          ) => {
            return (
              <div
                key={item.user_id}
                className="flex flex-col justify-between w-full max-w-md p-1 mx-auto border rounded-md shadow-sm bg-muted border-muted-foreground/10"
              >
                <div className="flex flex-col items-center justify-between w-full">
                  <div className="flex flex-row items-center justify-between w-full gap-3 pb-2 border-b">
                    <div className="flex flex-row gap-2">
                      <Avatar>
                        <AvatarImage src={item.avatar} />
                        <AvatarFallback>
                          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500">
                            <UserRound className="w-6 h-6 text-white" />
                          </div>
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-between">
                        <span className="text-sm font-bold text-muted-foreground">
                          {item.username}
                        </span>
                        <span className="text-xs font-normal text-muted-foreground">
                          {item.duration} minutos
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <span className="font-semibold">{index + 1}</span>
                      <Trophy className="w-5 h-5 text-yellow-500" />
                    </div>
                  </div>
                </div>
              </div>
            )
          },
        )}
    </main>
  )
}
