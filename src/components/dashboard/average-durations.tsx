import { useChallenge } from '@/context/challenge-context'
import { Event } from '@/utils/types'
import { useUser } from '@clerk/nextjs'
// Assuming useUser provides access to user details

const calculateDailyAverage = (
	events: Event[],
	currentDate: Date,
	userId: string,
) => {
	const eventsOnCurrentDay = events.filter(
		(event) =>
			new Date(event.date).toDateString() === currentDate.toDateString(),
	)

	if (eventsOnCurrentDay.length === 0) {
		return {
			average: null,
			today: 0, // No events for this day, so user's duration is 0
		}
	}

	const totalDuration = eventsOnCurrentDay.reduce(
		(acc, event) => acc + event.duration,
		0,
	)

	const userDailyDuration = eventsOnCurrentDay.reduce((acc, event) => {
		if (event.user.id === userId) {
			return acc + event.duration // Accumulate user's duration for the day
		}
		return acc
	}, 0)

	return {
		average: totalDuration / eventsOnCurrentDay.length,
		today: userDailyDuration,
	}
}

export function CalculateAverageDuration() {
	const { challenges } = useChallenge()
	const { user } = useUser()

	if (!user) return

	const result = []

	for (const challenge of challenges) {
		const { events, start_date, end_date } = challenge
		const end = new Date(end_date)

		for (
			let currentDate = new Date(start_date);
			currentDate <= end;
			currentDate.setDate(currentDate.getDate() + 1)
		) {
			const { average, today } = calculateDailyAverage(
				events,
				currentDate,
				user.id,
			)

			if (average !== null) {
				result.push({
					date: new Date(currentDate),
					average: average,
					today: today,
				})
			}
		}
	}

	return result
}
