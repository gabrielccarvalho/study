'use client'

import { Separator } from '@/components/ui/separator'
import { useChallenges } from '@/hooks/use-challenges'
import Image from 'next/image'
import { LeaveAlert } from './leaving-alert'
import { LoadingSkeleton } from './loading'
import { Rankings } from './rankings'

export function ChallengeOverview({ id }: { id: string }) {
	const { challenges, isLoading } = useChallenges()

	if (isLoading) {
		return <LoadingSkeleton />
	}

	const challenge = challenges?.find((challenge) => challenge.id === id)

	return (
		<main className='flex flex-col items-center'>
			<div className='flex flex-col items-center justify-center w-full overflow-hidden max-h-96'>
				<LeaveAlert id={id} />
				<Image
					src={challenge?.thumbnail || ''}
					alt='challenge image'
					width={1920}
					height={1080}
					quality={25}
				/>
			</div>
			<Rankings id={id} />
			<Separator />
		</main>
	)
}
