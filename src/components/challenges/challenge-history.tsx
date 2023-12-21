'use client'

import { useChallenge } from '@/context/challenge-context'
import { Event } from '@/utils/types'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '.@/components/ui/avatar'
import { Skeleton } from '.@/components/ui/skeleton'

function LoadingSkeleton() {
	return (
		<div className='flex flex-col w-full max-w-lg gap-2 mx-auto my-2'>
			<Skeleton className='w-20 h-5' />
			<div className='flex flex-col items-center justify-between w-full max-w-lg px-4 py-1 mx-auto rounded-md shadow-sm bg-muted'>
				<div className='flex flex-row items-center justify-between w-full p-1'>
					<div className='flex flex-row gap-2'>
						<Skeleton className='w-12 h-12 rounded-full' />
						<div className='flex flex-col justify-around'>
							<Skeleton className='w-16 h-4' />
							<Skeleton className='w-32 h-3' />
						</div>
					</div>
					<div className='flex flex-row self-end'>
						<Skeleton className='w-8 h-4' />
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center justify-between w-full max-w-lg px-4 py-1 mx-auto rounded-md shadow-sm bg-muted'>
				<div className='flex flex-row items-center justify-between w-full p-1'>
					<div className='flex flex-row gap-2'>
						<Skeleton className='w-12 h-12 rounded-full' />
						<div className='flex flex-col justify-around'>
							<Skeleton className='w-16 h-4' />
							<Skeleton className='w-32 h-3' />
						</div>
					</div>
					<div className='flex flex-row self-end'>
						<Skeleton className='w-8 h-4' />
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center justify-between w-full max-w-lg px-4 py-1 mx-auto rounded-md shadow-sm bg-muted'>
				<div className='flex flex-row items-center justify-between w-full p-1'>
					<div className='flex flex-row gap-2'>
						<Skeleton className='w-12 h-12 rounded-full' />
						<div className='flex flex-col justify-around'>
							<Skeleton className='w-16 h-4' />
							<Skeleton className='w-32 h-3' />
						</div>
					</div>
					<div className='flex flex-row self-end'>
						<Skeleton className='w-8 h-4' />
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center justify-between w-full max-w-lg px-4 py-1 mx-auto rounded-md shadow-sm bg-muted'>
				<div className='flex flex-row items-center justify-between w-full p-1'>
					<div className='flex flex-row gap-2'>
						<Skeleton className='w-12 h-12 rounded-full' />
						<div className='flex flex-col justify-around'>
							<Skeleton className='w-16 h-4' />
							<Skeleton className='w-32 h-3' />
						</div>
					</div>
					<div className='flex flex-row self-end'>
						<Skeleton className='w-8 h-4' />
					</div>
				</div>
			</div>
		</div>
	)
}

export function ChallengeHistory({ id }: { id: string }) {
	const { challenges } = useChallenge()

	const challenge = challenges.find((challenge) => challenge.id === id)

	if (!challenge) {
		return (
			<main className='flex flex-col flex-1 p-4'>
				<LoadingSkeleton />
				<LoadingSkeleton />
				<LoadingSkeleton />
				<LoadingSkeleton />
				<LoadingSkeleton />
			</main>
		)
	}

	const events = challenge.events.reduce(
		(acc: { [x: string]: Event[] }, event) => {
			const weekDay = format(new Date(event.date.seconds * 1000), 'eee', {
				locale: ptBR,
			})

			const monthDay = format(
				new Date(event.date.seconds * 1000),
				"dd 'de' LLLL",
				{
					locale: ptBR,
				},
			)

			const eventDate = `${weekDay}, ${monthDay}`

			if (!acc[eventDate]) {
				acc[eventDate] = []
			}

			acc[eventDate].push(event)

			return acc
		},
		{},
	)

	const eventsLength = Object.entries(events).map((evt) => evt).length

	if (eventsLength === 0) {
		return (
			<div className='flex flex-col items-center justify-center flex-1'>
				<span className='text-xl font-bold'>
					Ainda não há eventos registrados nesse desafio
				</span>
				<span className='max-w-xs text-sm font-light text-center'>
					Adicione um evento clicando no botão de adicionar no canto inferior
					direito!
				</span>
			</div>
		)
	}

	return (
		<main className='flex flex-col flex-1 p-4'>
			<div className='sticky top-0 right-0 flex flex-col items-start max-w-xs gap-2 p-2 border rounded-md shadow-lg border-muted-foreground/10 bg-muted'>
				<span className='text-sm font-semibold'>Código do desafio:</span>
				<span className='text-xs font-semibold text-center text-muted-foreground'>
					{id}
				</span>
			</div>
			{Object.entries(events).map(([date, events]) => (
				<div
					key={date}
					className='flex flex-col w-full max-w-lg gap-2 mx-auto my-2'
				>
					<h3 className='font-semibold text-md'>{date}</h3>
					{events.map((event) => (
						<Link key={event.id} href={`/challenge/${id}/event/${event.id}`}>
							<div className='flex flex-col items-center justify-between w-full max-w-lg px-4 py-1 mx-auto border rounded-md shadow-md bg-muted border-muted-foreground/10'>
								<div className='flex flex-row items-center justify-between w-full p-1'>
									<div className='flex flex-row gap-2'>
										<div className='relative'>
											<Avatar>
												<AvatarImage src={event.image} />
												<AvatarFallback>
													<div className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600'>
														<BookOpen className='w-6 h-6 text-white' />
													</div>
												</AvatarFallback>
											</Avatar>
											<Avatar className='absolute bottom-0 right-0 w-5 h-5'>
												<AvatarImage src={event.user.avatar} />
												<AvatarFallback>
													<div className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-black to-indigo-700' />
												</AvatarFallback>
											</Avatar>
										</div>
										<div className='flex flex-col justify-between'>
											<span className='font-semibold text-md'>
												{event.title}
											</span>
											<span className='text-sm font-light'>
												{event.user.username}
											</span>
										</div>
									</div>
									<div className='flex flex-row self-end'>
										<span className='text-xs font-thin'>
											{format(
												new Date(event.date.seconds * 1000),
												"hh:mm aaaaa'm",
											)}
										</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			))}
		</main>
	)
}
