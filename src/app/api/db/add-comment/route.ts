import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { newComment, eventId } = await request.json()

		const { rows } =
			await sql`UPDATE events SET comments = array_append(comments, ${newComment}) WHERE id = ${eventId} RETURNING *;`

		return NextResponse.json({ success: true, comment: newComment })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error: 'Error adding a comment' })
	}
}

export const revalidate = 0
