'use client'

import { firebaseApp } from '@/lib/firebase-config'
import { differenceInDays } from 'date-fns'
import {
  DocumentData,
  collection,
  getDocs,
  getFirestore,
} from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'

const ChallengeContext = createContext({
  challenges: [] as (DocumentData | undefined)[],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // update: () => {},
})

const db = getFirestore(firebaseApp)

export function ChallengeProvider({ children }: { children: React.ReactNode }) {
  const [challenges, setChallenges] = useState<DocumentData[]>([])

  useEffect(() => {
    async function signInWithClerk() {
      const snapshot = await getDocs(collection(db, 'challenges'))
      snapshot.docs.map((doc) => {
        const duration = differenceInDays(
          new Date(doc.data().end_date.seconds * 1000),
          new Date(doc.data().start_date.seconds * 1000),
        )

        const daysIntoChallenge = differenceInDays(
          new Date(),
          new Date(doc.data().start_date.seconds * 1000),
        )

        const progress = Math.round((daysIntoChallenge / duration) * 100)

        const leaderBoard = doc
          .data()
          .events.reduce(
            (
              acc: { user_id: string; duration: number; avatar: string }[],
              event: { user: string; duration: number; user_image: string },
            ) => {
              const existingUser = acc.find(
                (item) => item.user_id === event.user,
              )

              if (existingUser) {
                existingUser.duration += event.duration
              } else {
                acc.push({
                  user_id: event.user,
                  duration: event.duration,
                  avatar: event.user_image,
                })
              }

              return acc
            },
            [],
          )
        setChallenges([
          {
            ...doc.data(),
            id: doc.id,
            progress,
            daysIntoChallenge,
            duration,
            leaderBoard,
          },
        ])

        return 0
      })
    }

    signInWithClerk()
  }, [])

  return (
    <ChallengeContext.Provider value={{ challenges }}>
      {children}
    </ChallengeContext.Provider>
  )
}

export function useChallenge() {
  const { challenges } = useContext(ChallengeContext)

  return {
    challenges,
  }
}
