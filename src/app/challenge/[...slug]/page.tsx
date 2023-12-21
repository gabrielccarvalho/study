import { ChallengeHistory } from '@/components/challenges/challenge-history'
import { ChallengeOverview } from '@/components/challenges/challenge-overview'
import { EventOverview } from '@/components/events/event-overview'
import { Nav } from '@/components/nav'

export default function Challenge({ params }: { params: { slug: string[] } }) {
	const id = params.slug[0]
	const event = params.slug[2]

	return (
		<main className='flex flex-col h-screen'>
			{event ? (
				<>
					<Nav />
					<main className='flex flex-col flex-1'>
						<EventOverview id={id} event={event} />
					</main>
				</>
			) : (
				<>
					<Nav />
					<ChallengeOverview id={id} />
					<ChallengeHistory id={id} />
				</>
			)}
		</main>
	)
}
