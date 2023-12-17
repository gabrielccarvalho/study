'use client'

import { firebaseApp } from '@/lib/firebase-config'
import { useUser } from '@clerk/nextjs'
import { differenceInDays } from 'date-fns'
import {
  DocumentData,
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'

const ChallengeContext = createContext({
  challenges: [] as (DocumentData | undefined)[],
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  addEvent: (_data: any) => {},
})

const db = getFirestore(firebaseApp)

export function ChallengeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser()
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

        const leaderBoard = doc.data().events.reduce(
          (
            acc: {
              duration: number
              user: {
                id: string
                username: string
                avatar: string
              }
            }[],
            event: {
              user: {
                id: string
                username: string
                avatar: string
              }
              duration: number
            },
          ) => {
            const existingUser = acc.find(
              (item) => item.user.id === event.user.id,
            )

            if (existingUser) {
              existingUser.duration += event.duration
            } else {
              acc.push({
                user: {
                  id: event.user.id,
                  username: event.user.username,
                  avatar: event.user.avatar,
                },
                duration: event.duration,
              })
            }

            return acc
          },
          [],
        )

        setChallenges((challenges) => [
          ...challenges,
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

  async function addEvent(data: {
    title: string
    description: string
    duration: string
    challenge: string
    imageUrl: string
  }) {
    const { title, description, duration, challenge, imageUrl } = data

    const randomId = crypto.randomUUID()
    const date = new Date()

    await updateDoc(
      doc(db, 'challenges', challenge),
      'events',
      arrayUnion({
        title,
        description,
        duration: Number(duration),
        comments: [],
        date,
        id: randomId,
        image: imageUrl,
        user: {
          id: user?.id,
          username: user?.username,
          avatar: user?.imageUrl,
        },
      }),
    )
    // Add event to local state for immediate feedback
    setChallenges((challenges) => {
      const challengeIndex = challenges.findIndex(
        (challenge) => challenge.id === data.challenge,
      )

      const updatedChallenge = {
        ...challenges[challengeIndex],
        events: [
          ...challenges[challengeIndex].events,
          {
            title,
            description,
            duration: Number(duration),
            comments: [],
            date: {
              seconds: date.getTime() / 1000,
            },
            id: randomId,
            image: imageUrl,
            user: {
              id: user?.id,
              username: user?.username,
              avatar: user?.imageUrl,
            },
          },
        ],
      }

      const updatedChallenges = [...challenges]
      updatedChallenges[challengeIndex] = updatedChallenge

      return updatedChallenges
    })
  }

  return (
    <ChallengeContext.Provider value={{ challenges, addEvent }}>
      {children}
    </ChallengeContext.Provider>
  )
}

export function useChallenge() {
  const { challenges, addEvent } = useContext(ChallengeContext)

  return {
    challenges,
    addEvent,
  }
}
