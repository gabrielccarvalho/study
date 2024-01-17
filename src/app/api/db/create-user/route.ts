import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { data } = await request.json()

		const { id, firstName, lastName, username, imageUrl, emailAddress } = data

		await sql`INSERT INTO users (
      id,
      firstName,
      lastName,
      username,
      imageUrl,
      emailAddress,
      )
    VALUES (
      ${id},
      ${firstName},
      ${lastName},
      ${username},
      ${imageUrl},
      ${emailAddress},
      ) RETURNING *`

		return NextResponse.json({ success: true })
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: 'Error creating an user',
			error,
		})
	}
}

export const revalidate = 0
