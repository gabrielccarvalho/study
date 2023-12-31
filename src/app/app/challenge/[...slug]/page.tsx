import { ChallengeHistory } from '@/components/challenges/challenge-history'
import { ChallengeOverview } from '@/components/challenges/challenge-overview'
import { EventOverview } from '@/components/events/event-overview'

export default function Challenge({ params }: { params: { slug: string[] } }) {
	const id = params.slug[0]
	const event = params.slug[2]

	return (
		<>
			{event ? (
				<>
					<main className='flex flex-row flex-1'>
						<EventOverview id={id} event={event} />
					</main>
				</>
			) : (
				<div className='flex flex-col w-full'>
					<ChallengeOverview id={id} />
					<ChallengeHistory id={id} />
				</div>
			)}
		</>
	)
}
