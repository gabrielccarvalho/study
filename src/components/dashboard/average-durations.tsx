import { useChallenge } from '@/context/challenge-context'
import { Event } from '@/utils/types'
import { useUser } from '@clerk/nextjs'

const calculateUserAverageFromPastDays = (
	events: Event[],
	userId: string,
	currentDate: Date,
): number => {
	const userEvents = events.filter(
		(event) =>
			event.user.id === userId &&
			new Date(`${event.date.slice(0, 19)}`) < currentDate,
	)
	const userTotalDuration = userEvents.reduce(
		(acc, event) => acc + event.duration,
		0,
	)
	const userAverageFromPastDays =
		userEvents.length > 0 ? userTotalDuration / userEvents.length : 0

	return userAverageFromPastDays
}

const calculateDailyAverage = (
	events: Event[],
	currentDate: Date,
	userId: string,
) => {
	const eventsOnCurrentDay = events.filter(
		(event) =>
			new Date(`${event.date.slice(0, 19)}`).toDateString() ===
			currentDate.toDateString(),
	)

	if (eventsOnCurrentDay.length === 0) {
		return {
			average: null,
			today: 0,
		}
	}

	const userAverageFromPastDays = calculateUserAverageFromPastDays(
		events,
		userId,
		currentDate,
	)

	const userEventsOnCurrentDay = eventsOnCurrentDay.filter(
		(event) => event.user.id === userId,
	)

	const userDailyDuration = userEventsOnCurrentDay.reduce(
		(acc, event) => acc + event.duration,
		0,
	)

	const userAverage =
		userEventsOnCurrentDay.length > 0
			? (userDailyDuration +
					userEventsOnCurrentDay.length * userAverageFromPastDays) /
			  (userEventsOnCurrentDay.length + 1)
			: userAverageFromPastDays

	return {
		today: userDailyDuration,
		average: userAverage,
	}
}

export function CalculateAverageDuration() {
	const { events } = useChallenge()
	const { user } = useUser()

	if (!user) return

	const result = []

	const uniqueDates = new Set<string>()

	for (const event of events) {
		const eventDate = new Date(`${event.date.slice(0, 19)}`).toDateString()

		if (!uniqueDates.has(eventDate)) {
			const { average, today } = calculateDailyAverage(
				events,
				new Date(`${event.date.slice(0, 19)}`),
				user.id,
			)

			result.push({
				date: new Date(`${event.date.slice(0, 19)}`),
				average: average || 0,
				today: today || 0,
			})

			uniqueDates.add(eventDate)
		}
	}

	return result.reverse()
}
