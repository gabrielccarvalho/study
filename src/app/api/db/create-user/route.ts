import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { data } = await request.json()

		const { id, first_name, last_name, username, image_url, email_addresses } =
			data

		const email_address = email_addresses[0].email_address

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
      ${first_name},
      ${last_name},
      ${username},
      ${image_url},
      ${email_address},
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
