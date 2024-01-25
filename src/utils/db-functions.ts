import { differenceInDays } from 'date-fns'
import { Comment, Event } from './types'

export async function leaveChallenge({
	challengeId,
	userId,
}: { challengeId: string; userId: string }): Promise<void> {
	const res = await fetch('/api/db/leave-challenge', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ challengeId, userId }),
	})

	const { success } = await res.json()

	if (!success) throw new Error('Failed to leave challenge')
}

export async function joinChallenge({
	challengeId,
	userId,
}: { challengeId: string; userId: string }) {
	const res = await fetch('/api/db/join-challenge', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ challengeId, userId }),
	})

	const { success, challenge } = await res.json()

	if (!success) throw new Error('Failed to join challenge')

	return challenge
}

export async function addChallenge({
	title,
	description,
	thumbnail,
	startDate,
	endDate,
	members,
}: {
	title: string
	description: string
	thumbnail: string
	startDate: Date
	endDate: Date
	members: string[]
}) {
	const newChallenge = {
		id: crypto.randomUUID(),
		title,
		description,
		thumbnail,
		start_date: startDate.toISOString().slice(0, 19).replace('T', ' '),
		end_date: endDate.toISOString().slice(0, 19).replace('T', ' '),
		members,
		duration: differenceInDays(new Date(endDate), new Date(startDate)),
	}

	const res = await fetch('/api/db/add-challenge', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ newChallenge }),
	})

	const { success, challenge } = await res.json()

	if (!success) throw new Error('Failed to add challenge')

	return challenge
}

export async function addEvent({
	title,
	description,
	duration,
	challenge_id,
	tag,
	imageUrl,
	user,
}: {
	title: string
	description?: string
	duration: number
	challenge_id?: string
	tag?: string
	imageUrl: string
	user: {
		id: string
		username: string
		avatar: string
	}
}) {
	const newEvent: Event = {
		id: crypto.randomUUID(),
		title,
		description,
		duration,
		comments: [],
		date: new Date(new Date().setHours(new Date().getHours() - 3))
			.toISOString()
			.slice(0, 19)
			.replace('T', ' '),
		image: imageUrl,
		tag,
		user: {
			id: user.id,
			username: user.username,
			avatar: user.avatar,
		},
	}

	const res = await fetch('/api/db/add-event', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ newEvent, challengeId: challenge_id }),
	})

	const { success, event } = await res.json()

	if (!success) throw new Error('Failed to add event')

	return event
}

export async function deleteEvent({ id }: { id: string }) {
	const res = await fetch('/api/db/delete-event', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id }),
	})

	const { success } = await res.json()

	if (!success) throw new Error('Failed to delete event')
}

export async function addComment({
	eventId,
	content,
	user,
}: {
	eventId: string
	content: string
	user: { id: string; username: string; avatar: string }
}) {
	const newComment = {
		id: crypto.randomUUID(),
		content,
		created_at: new Date(new Date().setHours(new Date().getHours() - 3)),
		user: {
			id: user.id,
			username: user.username,
			avatar: user.avatar,
		},
	}

	const res = await fetch('/api/db/add-comment', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ eventId, newComment }),
	})

	const { success, comment } = await res.json()

	if (!success) throw new Error('Failed to add comment')

	return comment
}
