import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { challengeId, userId } = await request.json()

		const { rows } =
			await sql`UPDATE challenges SET members = array_append(members, ${userId})  WHERE id = ${challengeId} RETURNING *;`

		return NextResponse.json({ success: true, event: rows })
	} catch (error) {
		return NextResponse.json({ error: 'Error entering the challenge' })
	}
}

export const revalidate = 0

// UPDATE challenges SET members = array_append(members, 'user_2ZSLBT2w8snbsE2eAVGX5b6TWpJ')  WHERE id = '2aefa885-a284-4882-8dd5-8e6f34f2e1e2' RETURNING *;
