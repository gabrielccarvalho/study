export function formatWithOffset(date: Date | string, offSet: number) {
	const dateToFormat = typeof date === 'string' ? new Date(date) : date

	const hours = dateToFormat.getHours()
	const minutes = dateToFormat.getMinutes()
	const seconds = dateToFormat.getSeconds()

	const newHours = hours + offSet

	dateToFormat.setHours(newHours)
	dateToFormat.setMinutes(minutes)
	dateToFormat.setSeconds(seconds)

	return dateToFormat
}
