import { db } from '@/lib/firebase-config'
import { Challenge } from '@/utils/types'
import { addDoc, collection } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { newChallenge } = await request.json()

		await addDoc(collection(db, 'challenges'), newChallenge)

		const challenge: Challenge = newChallenge

		return NextResponse.json({ success: true, challenge })
	} catch (error) {
		return NextResponse.json({ error: 'Error adding a challenge' })
	}
}
