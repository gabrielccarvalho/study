import { db } from '@/lib/firebase-config'
import { Event } from '@/utils/types'
import { doc, updateDoc } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { updatedEvents, challengeId } = await request.json()

		await updateDoc(doc(db, 'challenges', challengeId), 'events', updatedEvents)

		const event: Event[] = updatedEvents

		return NextResponse.json({ success: true, event })
	} catch (error) {
		return NextResponse.json({ error: 'Error adding a comment' })
	}
}
