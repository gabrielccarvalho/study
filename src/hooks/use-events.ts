import { Event } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export async function fetchEvents(): Promise<Event[]> {
	const res = await fetch('/api/db/fetch-events', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const { events } = await res.json()

	return events
}

export function useEvents() {
	const {
		data: events,
		isSuccess,
		isLoading,
	} = useQuery({
		queryKey: ['events'],
		queryFn: fetchEvents,
	})

	return {
		events,
		isSuccess,
		isLoading,
	}
}
