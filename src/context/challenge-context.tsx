'use client'

import {
	Challenge,
	Comment,
	Event,
	addChallenge,
	addComment,
	addEvent,
	joinChallenge,
	leaveChallenge,
} from '@/utils/types'
import { useUser } from '@clerk/nextjs'
import { differenceInDays } from 'date-fns'
import { createContext, useContext, useEffect, useState } from 'react'

const ChallengeContext = createContext({
	events: [] as Event[],
	challenges: [] as Challenge[],
	addEvent: (_data: addEvent) => [] as unknown as Promise<Event>,
	addComment: (_data: addComment) => [] as unknown as Promise<Comment>,
	addChallenge: (_data: addChallenge) => [] as unknown as Promise<Challenge>,
	joinChallenge: (_data: joinChallenge) => [] as unknown as Promise<Challenge>,
	leaveChallenge: (_data: leaveChallenge) =>
		[] as unknown as Promise<Challenge>,
})

export function ChallengeProvider({ children }: { children: React.ReactNode }) {
	const { user } = useUser()
	const [events, setEvents] = useState<Event[]>([])
	const [challenges, setChallenges] = useState<Challenge[]>([])

	useEffect(() => {
		const fetchEvents = async () => {
			const info = await fetch('/api/db/fetch-events', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}).then(async (item) => {
				const response = await item.json()

				setEvents(response.events)
			})

			return info
		}

		const fetchChallenges = async () => {
			const info = await fetch('/api/db/fetch-challenges', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}).then(async (item) => {
				const response = await item.json()

				setChallenges(response.challenges)

				return response
			})

			return info
		}

		fetchChallenges()
		fetchEvents()
	}, [])

	async function addEvent(data: addEvent): Promise<Event> {
		if (!user) {
			throw new Error('User not logged in')
		}

		const { title, description, duration, challenge_id, imageUrl, tag } = data

		const randomId = crypto.randomUUID()
		const date = new Date()
		const localDate = new Date(date.setHours(date.getHours() - 3))

		const newEvent: Event = {
			id: randomId,
			title,
			description,
			duration,
			comments: [],
			date: localDate.toISOString().slice(0, 19).replace('T', ' '),
			image: imageUrl,
			tag,
			user: {
				id: user.id,
				username: user.username,
				avatar: (user.publicMetadata.imageUrl as string) || user.imageUrl,
			},
		}

		await fetch('/api/db/add-event', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				challengeId: challenge_id,
				newEvent,
			}),
		})

		setEvents((events) => [...events, newEvent])

		return newEvent
	}

	async function addComment(data: addComment): Promise<Comment> {
		if (!user) {
			throw new Error('User not logged in')
		}

		const { content, eventId } = data
		const now = new Date()
		const localDate = new Date(now.setHours(now.getHours() - 3))
		const randomId = crypto.randomUUID()

		const currentEvent = events.find((event) => event.id === eventId)

		if (!currentEvent) {
			throw new Error('Event not found')
		}

		const prevComments = currentEvent.comments

		const updatedComments = [
			...prevComments,
			{
				id: randomId,
				content,
				created_at: localDate.toISOString().slice(0, 19).replace('T', ' '),
				user: {
					id: user.id,
					username: user.username,
					avatar: user.publicMetadata.imageUrl as string,
				},
			},
		]
		setEvents((events) => {
			const eventIndex = events.findIndex((event) => event.id === eventId)

			const updatedEvent = {
				...events[eventIndex],
				comments: updatedComments,
			}

			const updatedEvents = [...events]
			updatedEvents[eventIndex] = updatedEvent

			return updatedEvents
		})

		await fetch('/api/db/add-comment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				eventId,
				updatedComments,
			}),
		})

		const newComment: Comment = {
			id: randomId,
			content,
			created_at: now.toISOString().slice(0, 19).replace('T', ' '),
			user: {
				id: user.id,
				username: user.username,
				avatar: user.publicMetadata.imageUrl as string,
			},
		}

		return newComment
	}

	async function addChallenge(data: addChallenge): Promise<Challenge> {
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

		const daysintochallenge = differenceInDays(new Date(), new Date(startDate))

		const progress = Math.round((daysintochallenge / duration) * 100)

		const leaderboard = events.reduce(
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

		const newChallenge = {
			id: randomUUID,
			title,
			description,
			thumbnail,
			start_date: startDate.toISOString().slice(0, 19).replace('T', ' '),
			end_date: endDate.toISOString().slice(0, 19).replace('T', ' '),
			events,
			members,
			progress,
			daysintochallenge,
			duration,
			leaderboard,
		}

		await fetch('/api/db/add-challenge', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ newChallenge }),
		})

		setChallenges((challenges) => [...challenges, newChallenge])

		return newChallenge
	}

	async function joinChallenge(data: joinChallenge): Promise<Challenge> {
		if (!user) {
			throw new Error('User not logged in')
		}

		const { challengeId } = data

		const existingChallenge = challenges.find(
			(challenge) => challenge.id === challengeId,
		)

		if (!existingChallenge) {
			throw new Error('Challenge not found')
		}

		await fetch('/api/db/join-challenge', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				challengeId,
				userId: user.id,
			}),
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

		return existingChallenge
	}

	async function leaveChallenge(data: joinChallenge): Promise<Challenge> {
		if (!user) {
			throw new Error('User not logged in')
		}

		const { challengeId } = data

		const existingChallenge = challenges.find(
			(challenge) => challenge.id === challengeId,
		)

		if (!existingChallenge) {
			throw new Error('Challenge not found')
		}

		await fetch('/api/db/leave-challenge', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				challengeId,
				userId: user.id,
			}),
		})

		setChallenges((challenges) => {
			const challengeIndex = challenges.findIndex(
				(challenge) => challenge.id === challengeId,
			)

			const updatedChallenge = {
				...challenges[challengeIndex],
				members: [
					...challenges[challengeIndex].members.filter(
						(member) => member !== user.id,
					),
				],
			}

			const updatedChallenges = [...challenges]
			updatedChallenges[challengeIndex] = updatedChallenge

			return updatedChallenges
		})

		return existingChallenge
	}

	return (
		<ChallengeContext.Provider
			value={{
				events,
				challenges,
				addEvent,
				addComment,
				addChallenge,
				joinChallenge,
				leaveChallenge,
			}}
		>
			{children}
		</ChallengeContext.Provider>
	)
}

export function useChallenge() {
	const {
		events,
		challenges,
		addEvent,
		addComment,
		addChallenge,
		joinChallenge,
		leaveChallenge,
	} = useContext(ChallengeContext)

	return {
		events,
		challenges,
		addEvent,
		addComment,
		addChallenge,
		joinChallenge,
		leaveChallenge,
	}
}
