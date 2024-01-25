import { Challenge } from './types'

export async function fetchChallenges(): Promise<Challenge[]> {
	const res = await fetch('/api/db/fetch-challenges', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const { challenges } = await res.json()

	return challenges
}
