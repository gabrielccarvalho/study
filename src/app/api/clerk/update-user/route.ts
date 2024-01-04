import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { userId, firstName, lastName, username, imageUrl } =
			await request.json()
		let user
		if (imageUrl !== null) {
			user = await clerkClient.users.updateUser(userId, {
				firstName,
				lastName,
				username,
				publicMetadata: {
					imageUrl,
				},
			})
		} else {
			user = await clerkClient.users.updateUser(userId, {
				firstName,
				lastName,
				username,
			})
		}

		return NextResponse.json({ success: true, user })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Error updating user' })
	}
}
