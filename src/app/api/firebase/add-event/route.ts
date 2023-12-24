import { db } from '@/lib/firebase-config'
import { Event } from '@/utils/types'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { newEvent, challengeId } = await request.json()

		await updateDoc(
			doc(db, 'challenges', challengeId),
			'events',
			arrayUnion(newEvent),
		)

		const event: Event = newEvent

		return NextResponse.json({ success: true, event })
	} catch (error) {
		return NextResponse.json({ error: 'Error adding am event' })
	}
}
