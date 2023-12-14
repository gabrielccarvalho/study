'use client'

import { useChallenge } from '@/context/challenge-context'
import { PlusIcon } from 'lucide-react'
import { ChallengeCard } from './challenge-card'
import { useUser } from '@clerk/nextjs'

export function ChallengeList() {
  const { challenges } = useChallenge()
  const { user } = useUser()

  if (!user) return

  return (
    <>
      {challenges
        .filter((challenge) => challenge?.members.includes(user.id))
        .map((challenge) => {
          if (!challenge) return null

          return <ChallengeCard key={challenge.id} id={challenge.id} />
        })}
      <div className="flex flex-col items-center justify-center border border-dashed rounded-md shadow-sm w-72 group hover:border-muted-foreground/80 hover:cursor-pointer">
        <PlusIcon
          className="w-16 h-16 text-muted-foreground/40 group-hover:text-muted-foreground/80"
          strokeWidth={1.2}
        />
      </div>
    </>
  )
}
