import { Event } from './types'

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
