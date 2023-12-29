import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { updatedEvents, challengeId } = await request.json()

		const { rows } =
			await sql`UPDATE challenges SET events = ${updatedEvents} WHERE id = ${challengeId} RETURNING *;`

		return NextResponse.json({ success: true, event: rows })
	} catch (error) {
		return NextResponse.json({ error: 'Error adding a comment' })
	}
}

export const revalidate = 0
