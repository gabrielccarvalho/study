import { Sidebar } from '@/components/app/sidebar'
import { ChallengeHistory } from '@/components/challenges/challenge-history'
import { ChallengeOverview } from '@/components/challenges/challenge-overview'
import { EventOverview } from '@/components/events/event-overview'
import { Nav } from '@/components/nav'

export default function Challenge({ params }: { params: { slug: string[] } }) {
	const id = params.slug[0]
	const event = params.slug[2]

	return (
		<main className='flex flex-col h-screen'>
			<Nav />
			{event ? (
				<>
					<main className='flex flex-row flex-1'>
						<Sidebar />
						<EventOverview id={id} event={event} />
					</main>
				</>
			) : (
				<div className='flex flex-1'>
					<Sidebar />
					<div className='flex flex-col w-full'>
						<ChallengeOverview id={id} />
						<ChallengeHistory id={id} />
					</div>
				</div>
			)}
		</main>
	)
}
