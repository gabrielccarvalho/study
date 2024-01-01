import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { challengeId, userId } = await request.json()

		const { rows } =
			await sql`UPDATE challenges SET members = array_remove(members, ${userId})  WHERE id = ${challengeId} RETURNING *;`

		return NextResponse.json({ success: true, event: rows })
	} catch (error) {
		return NextResponse.json({ error: 'Error entering the challenge' })
	}
}

export const revalidate = 0
