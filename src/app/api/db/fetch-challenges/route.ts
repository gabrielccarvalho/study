import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const { rows } =
			await sql`SELECT id, title, description, thumbnail, start_date, end_date, members, leaderboard, duration, daysintochallenge, progress, events FROM challenges ORDER BY start_date DESC`

		return NextResponse.json({ success: true, challenges: rows })
	} catch (error) {
		return NextResponse.json({ error: 'Error fetching challenges' })
	}
}

export const revalidate = 60
