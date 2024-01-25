import { Challenge } from '@/utils/types'
import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { newChallenge } = await request.json()

		const {
			id,
			title,
			description,
			thumbnail,
			start_date,
			end_date,
			members,
			learderboard,
			duration,
			daysintochallenge,
			progress,
		} = newChallenge

		const [member] = members

		await sql`INSERT INTO challenges (
      id,
      title,
      description,
      thumbnail,
      start_date,
      end_date,
      members,
      leaderboard,
      duration,
      daysIntoChallenge,
      progress
      )
    VALUES (
      ${id},
      ${title},
      ${description},
      ${thumbnail},
      ${start_date},
      ${end_date},
      ARRAY [${member}],
      ${learderboard}::jsonb[],
      ${duration},
      ${daysintochallenge},
      ${progress}
      ) RETURNING *`

		const challenge: Challenge = newChallenge

		return NextResponse.json({ success: true, challenge })
	} catch (error) {
		return NextResponse.json({ error: 'Error adding a challenge' })
	}
}

export const revalidate = 0
