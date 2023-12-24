import { db } from '@/lib/firebase-config'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { challengeId, userId } = await request.json()

		await updateDoc(doc(db, 'challenges', challengeId), {
			members: arrayUnion(userId),
		})

		return NextResponse.json({ success: true, id: challengeId })
	} catch (error) {
		return NextResponse.json({ error: 'Error adding a challenge' })
	}
}
