'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@clerk/nextjs'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { Bar, BarChart, ResponsiveContainer } from 'recharts'
import { DailyGoal } from './daily-goal'

const data = [
	{
		goal: 400,
	},
	{
		goal: 300,
	},
	{
		goal: 200,
	},
	{
		goal: 300,
	},
	{
		goal: 200,
	},
	{
		goal: 278,
	},
	{
		goal: 189,
	},
	{
		goal: 239,
	},
	{
		goal: 300,
	},
	{
		goal: 200,
	},
	{
		goal: 278,
	},
	{
		goal: 189,
	},
	{
		goal: 349,
	},
]

function LoadingSkeleton() {
	return (
		<div className='flex flex-col items-center w-full gap-4 p-4 rounded-md md:max-w-sm max-w-none'>
			<div className='flex flex-col items-center w-full p-4 border rounded-md shadow-lg border-muted-foreground/15'>
				<Skeleton className='w-32 h-32 rounded-full' />
				<div className='flex flex-col items-center mt-2'>
					<Skeleton className='w-32 h-4' />
					<Skeleton className='w-24 h-3 mt-1' />
				</div>
			</div>
			<div className='flex flex-col items-center w-full p-4 border rounded-md shadow-lg border-muted-foreground/15'>
				<Skeleton className='h-5 w-36' />
				<Skeleton className='w-48 h-4 my-2' />
				<div className='w-full p-4'>
					<div className='flex items-center justify-center space-x-2'>
						<Button
							variant='outline'
							size='icon'
							className='w-6 h-6 rounded-full shrink-0'
							disabled
						>
							<MinusIcon className='w-3 h-3' />
							<span className='sr-only'>Diminuir</span>
						</Button>
						<div className='flex-1 text-center'>
							<div className='flex justify-center text-4xl font-bold tracking-tighter'>
								<Skeleton className='w-16 h-8 mb-2' />
							</div>
							<div className='text-[0.60rem] uppercase text-muted-foreground'>
								Minutos por dia
							</div>
						</div>
						<Button
							variant='outline'
							size='icon'
							className='w-6 h-6 rounded-full shrink-0'
							disabled
						>
							<PlusIcon className='w-3 h-3' />
							<span className='sr-only'>Aumentar</span>
						</Button>
					</div>
					<div className='h-20 mt-3'>
						<ResponsiveContainer width='100%' height='100%'>
							<BarChart data={data}>
								<Bar
									className='animate-pulse'
									dataKey='goal'
									style={
										{
											fill: 'hsl(var(--primary)',
											opacity: 0.1,
										} as React.CSSProperties
									}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		</div>
	)
}

export function UserCard() {
	const { user } = useUser()

	if (!user) {
		return <LoadingSkeleton />
	}

	return (
		<div className='flex flex-col items-center w-full gap-4 p-4 rounded-md md:max-w-sm max-w-none'>
			<div className='flex flex-col items-center w-full p-4 border rounded-md shadow-lg border-muted-foreground/15'>
				<Image
					src={user.imageUrl}
					alt='user avatar'
					width={128}
					height={128}
					quality={90}
					className='rounded-full'
				/>
				<div className='flex flex-col items-center mt-2'>
					<h2 className='text-xl font-semibold'>
						{user.firstName} {user.lastName}
					</h2>
					<span className='text-sm text-muted-foreground'>
						@{user.username}
					</span>
				</div>
			</div>
			<div className='flex flex-col w-full p-4 border rounded-md shadow-lg border-muted-foreground/15'>
				<DailyGoal />
			</div>
		</div>
	)
}
