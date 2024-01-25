'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { useChallenges } from '@/hooks/use-challenges'
import { differenceInDays } from 'date-fns'

function LoadingSkeleton() {
	return (
		<div className='flex flex-col border rounded-md shadow-sm borrder-border w-72'>
			<Skeleton className='h-48 rounded-b-none w-72 bg-muted-foreground' />
			<div className='flex flex-col p-2'>
				<Skeleton className='w-20 h-5 my-1 bg-muted-foreground' />
				<Skeleton className='w-32 h-3 mt-1 bg-muted-foreground' />
				<div className='flex flex-col items-end gap-1 pt-4'>
					<Skeleton className='w-full h-2 bg-muted-foreground' />
					<Skeleton className='w-12 h-3 bg-muted-foreground' />
				</div>
				<div className='flex w-full py-2'>
					<Skeleton className='w-24 h-9 bg-muted-foreground' />
				</div>
			</div>
		</div>
	)
}

export function ChallengeCard({ id }: { id: string }) {
	const { challenges } = useChallenges()

	const challenge = challenges?.find((challenge) => challenge.id === id)

	if (!challenge) {
		return <LoadingSkeleton />
	}

	const progress =
		((challenge.duration -
			differenceInDays(new Date(challenge.end_date), new Date())) /
			challenge.duration) *
		100

	return (
		<div className='flex flex-col overflow-hidden border rounded-md shadow-md border-muted-foreground/10 w-72'>
			<div className='flex items-center justify-center overflow-hidden max-h-48 roundend-t-md'>
				<Image
					src={challenge.thumbnail}
					alt='Challenge Image'
					width={300}
					height={300}
					quality={10}
					className='rounded-t-md'
				/>
			</div>
			<div className='flex flex-col p-2'>
				<span className='text-lg font-bold'>{challenge.title}</span>
				<span className='text-sm text-gray-500'>{challenge.description}</span>
				<div className='flex flex-col items-end gap-1 pt-4'>
					<Progress value={progress} />
					<span className='text-xs text-gray-500'>
						{challenge.duration -
							differenceInDays(new Date(challenge.end_date), new Date())}
						/{challenge.duration}
					</span>
				</div>
				<div className='flex w-full py-2'>
					<Link href={`/app/challenges/${id}`}>
						<Button variant='default'>
							<span className='text-xs'>Ver Desafio</span>
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
