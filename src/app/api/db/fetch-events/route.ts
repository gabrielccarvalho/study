import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const { rows } = await sql`SELECT * FROM events ORDER BY date DESC`

		return NextResponse.json({ success: true, events: rows })
	} catch (error) {
		return NextResponse.json({ error: 'Error fetching events' })
	}
}

export const revalidate = 0
