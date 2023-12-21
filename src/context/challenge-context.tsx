/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { firebaseApp } from '@/lib/firebase-config'
import { Challenge, Event } from '@/utils/types'
import { useUser } from '@clerk/nextjs'
import { differenceInDays } from 'date-fns'
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'

type addEventType = {
  title: string
  description: string
  duration: number
  challenge: string
  imageUrl: string
}

type addCommentType = {
  content: string
  challengeId: string
  eventId: string
}

type addChallengeType = {
  title: string
  description: string
  thumbnail: string
  startDate: Date
  endDate: Date
  events: Event[]
  members: string[]
}

type joinChallengeType = {
  challengeId: string
}

const ChallengeContext = createContext({
  challenges: [] as Challenge[],
  addEvent: (_data: addEventType) =>
    [] as unknown as Promise<Challenge[] | void>,
  addComment: (_data: addCommentType) =>
    [] as unknown as Promise<Challenge[] | void>,
  addChallenge: (_data: addChallengeType) =>
    [] as unknown as Promise<Challenge[] | void>,
  joinChallenge: (_data: joinChallengeType) =>
    [] as unknown as Promise<Challenge[] | void>,
})

const db = getFirestore(firebaseApp)

export function ChallengeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser()
  const [challenges, setChallenges] = useState<Challenge[]>([])

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
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            thumbnail: doc.data().thumbnail,
            start_date: doc.data().start_date,
            end_date: doc.data().end_date,
            events: doc.data().events,
            members: doc.data().members,
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

  async function addEvent(data: addEventType): Promise<Challenge[] | void> {
    if (!user) return
    const { title, description, duration, challenge, imageUrl } = data

    const randomId = crypto.randomUUID()
    const date = new Date()

    await updateDoc(
      doc(db, 'challenges', challenge),
      'events',
      arrayUnion({
        title,
        description,
        duration,
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
              nanoseconds: 0,
            },
            id: randomId,
            image: imageUrl,
            user: {
              id: user.id,
              username: user.username,
              avatar: user.imageUrl,
            },
          },
        ],
      }

      const updatedChallenges = [...challenges]
      updatedChallenges[challengeIndex] = updatedChallenge

      return updatedChallenges
    })
  }

  async function addComment(data: addCommentType): Promise<Challenge[] | void> {
    if (!user) return

    const { content, challengeId, eventId } = data
    const now = new Date()

    const randomId = crypto.randomUUID()

    // Add comment to local state for immediate feedback
    setChallenges((challenges) => {
      const challengeIndex = challenges.findIndex(
        (challenge) => challenge.id === challengeId,
      )

      const eventIndex = challenges[challengeIndex].events.findIndex(
        (event) => event.id === eventId,
      )

      const updatedEvent = {
        ...challenges[challengeIndex].events[eventIndex],
        comments: [
          ...challenges[challengeIndex].events[eventIndex].comments,
          {
            id: randomId,
            content,
            created_at: {
              seconds: now.getTime() / 1000,
              nanoseconds: 0,
            },
            user: {
              id: user.id,
              username: user.username,
              avatar: user.imageUrl,
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

  async function addChallenge(
    data: addChallengeType,
  ): Promise<Challenge[] | void> {
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
            username: string | null
            avatar: string
          }
        }[],
        event,
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
          nanoseconds: 0,
        },
        end_date: {
          seconds: endDate.getTime() / 1000,
          nanoseconds: 0,
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

  async function joinChallenge(
    data: joinChallengeType,
  ): Promise<Challenge[] | void> {
    if (!user) return

    const { challengeId } = data

    await updateDoc(doc(db, 'challenges', challengeId), {
      members: arrayUnion(user?.id),
    })

    setChallenges((challenges) => {
      const challengeIndex = challenges.findIndex(
        (challenge) => challenge.id === challengeId,
      )

      const updatedChallenge = {
        ...challenges[challengeIndex],
        members: [...challenges[challengeIndex].members, user.id],
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
