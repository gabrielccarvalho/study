import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { userId, firstName, lastName, username, imageUrl } =
			await request.json()
		const user = await clerkClient.users.updateUser(userId, {
			firstName,
			lastName,
			username,
			publicMetadata: {
				imageUrl,
			},
		})

		return NextResponse.json({ success: true, user })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Error updating user' })
	}
}
