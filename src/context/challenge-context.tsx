'use client'

import {
	Challenge,
	Comment,
	Event,
	addChallenge,
	addComment,
	addEvent,
	joinChallenge,
} from '@/utils/types'
import { useUser } from '@clerk/nextjs'
import { differenceInDays } from 'date-fns'
import { createContext, useContext, useEffect, useState } from 'react'

const ChallengeContext = createContext({
	challenges: [] as Challenge[],
	addEvent: (_data: addEvent) => [] as unknown as Promise<Event>,
	addComment: (_data: addComment) => [] as unknown as Promise<Comment>,
	addChallenge: (_data: addChallenge) => [] as unknown as Promise<Challenge>,
	joinChallenge: (_data: joinChallenge) => [] as unknown as Promise<Challenge>,
})

export function ChallengeProvider({ children }: { children: React.ReactNode }) {
	const { user } = useUser()
	const [challenges, setChallenges] = useState<Challenge[]>([])

	useEffect(() => {
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
	}, [])

	async function addEvent(data: addEvent): Promise<Event> {
		if (!user) {
			throw new Error('User not logged in')
		}

		const { title, description, duration, challenge, imageUrl } = data

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
			user: {
				id: user.id,
				username: user.username,
				avatar: user.imageUrl,
			},
		}

		await Promise.all([
			fetch('/api/db/add-event', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					challengeId: challenge,
					newEvent,
				}),
			}),
			setChallenges((challenges) => {
				const challengeIndex = challenges.findIndex(
					(challenge) => challenge.id === data.challenge,
				)

				const updatedChallenge = {
					...challenges[challengeIndex],
					events: [...challenges[challengeIndex].events, newEvent],
				}

				const updatedChallenges = [...challenges]
				updatedChallenges[challengeIndex] = updatedChallenge

				return updatedChallenges
			}),
		])

		return newEvent
	}

	async function addComment(data: addComment): Promise<Comment> {
		if (!user) {
			throw new Error('User not logged in')
		}

		const { content, challengeId, eventId } = data
		const now = new Date()
		const localDate = new Date(now.setHours(now.getHours() - 3))
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
						created_at: localDate.toISOString().slice(0, 19).replace('T', ' '),
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

			// Add comment
			async function addCommentOnDb() {
				await fetch('/api/db/add-comment', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						challengeId,
						updatedEvents,
					}),
				})
			}

			const updatedChallenges = [...challenges]
			updatedChallenges[challengeIndex] = updatedChallenge

			addCommentOnDb()

			return updatedChallenges
		})

		const newComment: Comment = {
			id: randomId,
			content,
			created_at: now.toISOString().slice(0, 19).replace('T', ' '),
			user: {
				id: user.id,
				username: user.username,
				avatar: user.imageUrl,
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

		await fetch('/api/firebase/join-challenge', {
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
