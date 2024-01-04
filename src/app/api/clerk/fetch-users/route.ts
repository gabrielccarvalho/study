import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const users = await clerkClient.users.getUserList()

		return NextResponse.json({ success: true, users })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Error fetching user list' })
	}
}
