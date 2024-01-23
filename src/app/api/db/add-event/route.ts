import { Event } from '@/utils/types'
import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { newEvent, challengeId } = await request.json()

		await sql`
    INSERT INTO events
		(id, challenge_id, date, "user", image, title, comments, duration, description, tag)
		VALUES (
			${newEvent.id},
			${challengeId},
			${newEvent.date},
			${newEvent.user},
			${newEvent.image},
			${newEvent.title},
			${newEvent.comments},
			${newEvent.duration},
			${newEvent.description},
			${newEvent.tag})
    RETURNING *;
    `

		const event: Event = newEvent

		return NextResponse.json({ success: true, event })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error: 'Error adding an event' })
	}
}

export const revalidate = 0
