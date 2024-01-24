import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { id } = await request.json()

		await sql`DELETE FROM events WHERE id = ${id}`

		return NextResponse.json({ success: true })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error: 'Error deleting the event' })
	}
}

export const revalidate = 0
