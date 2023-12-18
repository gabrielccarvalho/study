/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { firebaseApp } from '@/lib/firebase-config'
import { Event } from '@/utils/types'
import { useUser } from '@clerk/nextjs'
import { differenceInDays } from 'date-fns'
import {
  DocumentData,
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'

const ChallengeContext = createContext({
  challenges: [] as DocumentData[],
  addEvent: (_data: any) => {},
  addComment: (_data: any) => {},
  addChallenge: (_data: any) => {},
  joinChallenge: (_data: any) => {},
})

const db = getFirestore(firebaseApp)

export function ChallengeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser()
  const [challenges, setChallenges] = useState<DocumentData[]>([])

  useEffect(() => {
    async function fetchChallenges() {
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

    fetchChallenges()
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

  async function addComment(data: {
    content: string
    challengeId: string
    eventId: string
  }) {
    const { content, challengeId, eventId } = data
    const now = new Date()

    const randomId = crypto.randomUUID()

    // Add comment to local state for immediate feedback
    setChallenges((challenges) => {
      const challengeIndex = challenges.findIndex(
        (challenge) => challenge.id === challengeId,
      )

      const eventIndex = challenges[challengeIndex].events.findIndex(
        (event: { id: string }) => event.id === eventId,
      )

      const updatedEvent = {
        ...challenges[challengeIndex].events[eventIndex],
        comments: [
          ...challenges[challengeIndex].events[eventIndex].comments,
          {
            content,
            id: randomId,
            created_at: {
              seconds: now.getTime() / 1000,
            },
            user: {
              id: user?.id,
              username: user?.username,
              avatar: user?.imageUrl,
            },
          },
        ],
      }

      const updatedEvents = [...challenges[challengeIndex].events]
      updatedEvents[eventIndex] = updatedEvent

      const updatedChallenge = {
        ...challenges[challengeIndex],
        events: updatedEvents,
      }

      // Add comment to firestore
      async function addCommentToFirestore() {
        await updateDoc(
          doc(db, 'challenges', challengeId),
          'events',
          updatedEvents,
        )
      }

      const updatedChallenges = [...challenges]
      updatedChallenges[challengeIndex] = updatedChallenge

      addCommentToFirestore()

      return updatedChallenges
    })
  }

  async function addChallenge(data: {
    title: string
    description: string
    thumbnail: string
    startDate: Date
    endDate: Date
    events: Event[]
    members: string[]
  }) {
    const {
      title,
      description,
      thumbnail,
      startDate,
      endDate,
      events,
      members,
    } = data

    const duration = differenceInDays(new Date(endDate), new Date(startDate))

    const daysIntoChallenge = differenceInDays(new Date(), new Date(startDate))

    const progress = Math.round((daysIntoChallenge / duration) * 100)

    const leaderBoard = events.reduce(
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
        const existingUser = acc.find((item) => item.user.id === event.user.id)

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

    const randomUUID = crypto.randomUUID()

    await addDoc(collection(db, 'challenges'), {
      id: randomUUID,
      title,
      description,
      thumbnail,
      start_date: startDate,
      end_date: endDate,
      events,
      members,
    })

    setChallenges((challenges) => [
      ...challenges,
      {
        id: randomUUID,
        title,
        description,
        thumbnail,
        start_date: {
          seconds: startDate.getTime() / 1000,
        },
        end_date: {
          seconds: endDate.getTime() / 1000,
        },
        events,
        members,
        progress,
        daysIntoChallenge,
        duration,
        leaderBoard,
      },
    ])
  }

  async function joinChallenge(challengeId: string) {
    await updateDoc(doc(db, 'challenges', challengeId), {
      members: arrayUnion(user?.id),
    })

    setChallenges((challenges) => {
      const challengeIndex = challenges.findIndex(
        (challenge) => challenge.id === challengeId,
      )

      const updatedChallenge = {
        ...challenges[challengeIndex],
        members: [...challenges[challengeIndex].members, user?.id],
      }

      const updatedChallenges = [...challenges]
      updatedChallenges[challengeIndex] = updatedChallenge

      return updatedChallenges
    })
  }

  return (
    <ChallengeContext.Provider
      value={{ challenges, addEvent, addComment, addChallenge, joinChallenge }}
    >
      {children}
    </ChallengeContext.Provider>
  )
}

export function useChallenge() {
  const { challenges, addEvent, addComment, addChallenge, joinChallenge } =
    useContext(ChallengeContext)

  return {
    challenges,
    addEvent,
    addComment,
    addChallenge,
    joinChallenge,
  }
}
