import { Event } from '@/utils/types'
import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { newEvent, challengeId } = await request.json()

		const fetchResult =
			await sql`SELECT events FROM challenges WHERE id = ${challengeId}`
		const existingEvents = fetchResult.rows[0].events

		const updatedEvents = existingEvents.concat(newEvent)

		await sql`
    UPDATE challenges
    SET events = ${updatedEvents}
    WHERE id = ${challengeId}
    RETURNING *;
    `

		const event: Event = newEvent

		return NextResponse.json({ success: true, event })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error: 'Error adding a challenge' })
	}
}

export const revalidate = 0
