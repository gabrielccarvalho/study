'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useChallenge } from '@/context/challenge-context'
import { useUser } from '@clerk/nextjs'
import { Calendar, UserRound } from 'lucide-react'
import Image from 'next/image'

function LoadingSkeleton() {
	return (
		<main className='flex flex-col items-center'>
			<div className='flex flex-col items-center justify-center w-full overflow-hidden max-h-96'>
				<Skeleton className='w-full mb-2 rounded-none aspect-[16/9]' />
			</div>
			<div className='flex flex-row items-center justify-around w-full max-w-md py-4 mx-auto'>
				<div className='flex flex-row items-center gap-2'>
					<Skeleton className='w-10 h-10 rounded-full' />
					<div className='flex flex-col justify-between'>
						<Skeleton className='w-12 h-3 my-1' />
						<Skeleton className='w-8 h-2' />
					</div>
				</div>

				<div className='flex flex-row items-center gap-2'>
					<Skeleton className='w-10 h-10 rounded-full' />
					<div className='flex flex-col justify-between'>
						<Skeleton className='w-12 h-3 my-1' />
						<Skeleton className='w-8 h-2' />
					</div>
				</div>

				<div className='flex flex-row items-center gap-2'>
					<Skeleton className='w-10 h-10 rounded-full' />
					<div className='flex flex-col justify-between'>
						<Skeleton className='w-12 h-3 my-1' />
						<Skeleton className='w-8 h-2' />
					</div>
				</div>
			</div>
			<Separator />
		</main>
	)
}

export function ChallengeOverview({ id }: { id: string }) {
	const { challenges } = useChallenge()

	const { user } = useUser()

	const challenge = challenges.find((challenge) => challenge.id === id)

	if (!challenge || !user) {
		return <LoadingSkeleton />
	}

	const userChallengeData = challenge.leaderBoard.find(
		(item) => item.user.id === user.id,
	)

	const userPoints = userChallengeData?.duration || 0

	const leaderChallengeData = challenge.leaderBoard.find(
		(item) =>
			item.duration ===
			Math.max(...challenge.leaderBoard.map((item) => item.duration)),
	)

	const leaderPoints = leaderChallengeData?.duration || 0

	return (
		<main className='flex flex-col items-center'>
			<div className='flex flex-col items-center justify-center w-full overflow-hidden max-h-96'>
				<Image
					src={challenge.thumbnail}
					alt='challenge image'
					width={1920}
					height={1080}
					quality={25}
				/>
			</div>
			<div className='flex flex-row items-center justify-around w-full max-w-md py-4 mx-auto'>
				<div className='flex flex-row items-center gap-2'>
					<Avatar>
						<AvatarImage src={leaderChallengeData?.user.avatar} />
						<AvatarFallback>
							<div className='flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500'>
								<UserRound className='w-6 h-6 text-white' />
							</div>
						</AvatarFallback>
					</Avatar>
					<div className='flex flex-col justify-between'>
						<span className='text-sm'>{leaderPoints}</span>
						<span className='text-xs'>Líder</span>
					</div>
				</div>

				<div className='flex flex-row items-center gap-2'>
					<Avatar>
						<AvatarImage src={user.imageUrl} />
						<AvatarFallback>
							<div className='flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500'>
								<UserRound className='w-6 h-6 text-white' />
							</div>
						</AvatarFallback>
					</Avatar>
					<div className='flex flex-col justify-between'>
						<span className='text-xs'>{userPoints}</span>
						<span className='text-xs'>Você</span>
					</div>
				</div>

				<div className='flex flex-row items-center gap-2'>
					<Calendar className='w-6 h-6 text-gray-500' />
					<div className='flex flex-col justify-between'>
						<span className='text-xs'>
							{challenge.duration - challenge.daysIntoChallenge}
						</span>
						<span className='text-xs'>dias restantes</span>
					</div>
				</div>
			</div>
			<Separator />
		</main>
	)
}
