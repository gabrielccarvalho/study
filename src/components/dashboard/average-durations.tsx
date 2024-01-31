import { useEvents } from '@/hooks/use-events'
import { formatWithOffset } from '@/utils/format-timezone'
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
			new Date(formatWithOffset(event.date, 3)) < currentDate,
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
			new Date(formatWithOffset(event.date, 3)).toDateString() ===
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
	const { user } = useUser()
	const { events } = useEvents()

	if (!user || !events) return

	const result = []

	const uniqueDates = new Set<string>()

	for (const event of events) {
		const eventDate = new Date(formatWithOffset(event.date, 3)).toDateString()

		if (!uniqueDates.has(eventDate)) {
			const { average, today } = calculateDailyAverage(
				events,
				new Date(formatWithOffset(event.date, 3)),
				user.id,
			)

			result.push({
				date: new Date(formatWithOffset(event.date, 3)),
				average: average || 0,
				today: today || 0,
			})

			uniqueDates.add(eventDate)
		}
	}

	return result.reverse()
}
