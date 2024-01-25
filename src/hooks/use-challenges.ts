import { Challenge } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

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

export function useChallenges() {
	const {
		data: challenges,
		isSuccess,
		isLoading,
	} = useQuery({
		queryKey: ['challenges'],
		queryFn: fetchChallenges,
	})

	return {
		challenges,
		isSuccess,
		isLoading,
	}
}
