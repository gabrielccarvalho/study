import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const { rows } =
			await sql`SELECT * FROM challenges ORDER BY start_date DESC`

		return NextResponse.json({ success: true, challenges: rows })
	} catch (error) {
		return NextResponse.json({ error: 'Error fetching challenges' })
	}
}

export const revalidate = 10
