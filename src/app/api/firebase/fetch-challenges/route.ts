import { db } from '@/lib/firebase-config'
import { differenceInDays } from 'date-fns'
import { collection, getDocs } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const snapshot = await getDocs(collection(db, 'challenges'))
		const challenges = snapshot.docs.map((doc) => {
			const duration = differenceInDays(
				new Date(doc.data().end_date.seconds * 1000),
				new Date(doc.data().start_date.seconds * 1000),
			)

			const daysIntoChallenge = differenceInDays(
				new Date(),
				new Date(doc.data().start_date.seconds * 1000),
			)

			const progress = Math.round((daysIntoChallenge / duration) * 100)

			const leaderBoard = doc.data().events.reduce(
        (
          acc: {
            duration: number
            user: {
              id: string
              username: string
              avatar: string
            }
          }[],
          event: {
            user: {
              id: string
              username: string
              avatar: string
            }
            duration: number
          },
        ) => {
          const existingUser = acc.find(
            (item) => item.user.id === event.user.id,
          )

          if (existingUser) {
            existingUser.duration += event.duration
          } else {
            acc.push({
              user: {
                id: event.user.id,
                username: event.user.username,
                avatar: event.user.avatar,
              },
              duration: event.duration,
            })
          }

          return acc
        },
        [],
      )

			return {
				id: doc.id,
				title: doc.data().title,
				description: doc.data().description,
				thumbnail: doc.data().thumbnail,
				start_date: doc.data().start_date,
				end_date: doc.data().end_date,
				events: doc.data().events,
				members: doc.data().members,
				progress,
				daysIntoChallenge,
				duration,
				leaderBoard,
			}
		})

		return NextResponse.json({ success: true, challenges })
	} catch (error) {
		return NextResponse.json({ error: 'Error fetching challenges' })
	}
}
