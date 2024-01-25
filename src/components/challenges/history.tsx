'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchEvents } from '@/utils/fetch-events'
import { fetchUsers } from '@/utils/fetch-users'
import { Event } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'
import { addDays, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'

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
	const { data: userList } = useQuery({
		queryKey: ['users'],
		queryFn: fetchUsers,
	})

	const {
		data: events,
		isSuccess: isEventsSuccess,
		isLoading,
	} = useQuery({
		queryKey: ['events'],
		queryFn: fetchEvents,
	})

	if (isLoading) {
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

	if (!isEventsSuccess) return

	const challengeEvents = events
		.filter((evt) => evt.challenge_id === id)
		.reduce((acc: { [x: string]: Event[] }, event) => {
			const eventDate = format(
				new Date(
					new Date(event.date).setHours(new Date(event.date).getHours() - 3),
				),
				'yyyy-MM-dd',
			)

			if (!acc[eventDate]) {
				acc[eventDate] = []
			}

			acc[eventDate].push(event)

			return acc
		}, {})

	const sortedEvents = Object.fromEntries(
		Object.entries(challengeEvents).sort(([dateA], [dateB]) => {
			const dateObjectA = new Date(dateA)
			const dateObjectB = new Date(dateB)
			return dateObjectB.getTime() - dateObjectA.getTime()
		}),
	)

	const eventsLength = Object.entries(challengeEvents).map((evt) => evt).length

	if (eventsLength === 0) {
		return (
			<main className='flex flex-col flex-1 p-4'>
				<div className='absolute flex flex-col items-start max-w-xs gap-2 p-2 border rounded-md shadow-lg left-24 border-muted-foreground/10 bg-muted'>
					<span className='text-sm font-semibold'>Código do desafio:</span>
					<span className='text-xs font-semibold text-center text-muted-foreground'>
						{id}
					</span>
				</div>
				<div className='flex flex-col items-center justify-center flex-1'>
					<span className='text-xl font-bold'>
						Ainda não há eventos registrados nesse desafio
					</span>
					<span className='max-w-xs text-sm font-light text-center'>
						Adicione um evento clicando no botão de adicionar no canto inferior
						direito!
					</span>
				</div>
			</main>
		)
	}
	return (
		<main className='flex flex-col flex-1 p-4'>
			{/* <div className='flex-col items-start hidden max-w-xs gap-2 p-2 border rounded-md shadow-lg md:flex md:absolute left-24 border-muted-foreground/10 bg-muted'>
				<span className='text-sm font-semibold'>Código do desafio:</span>
				<span className='text-xs font-semibold text-center text-muted-foreground'>
					{id}
				</span>
			</div> */}
			{Object.entries(sortedEvents).map(([date, events]) => (
				<div
					key={date}
					className='flex flex-col w-full max-w-lg gap-2 mx-auto my-2'
				>
					<h3 className='font-semibold text-md'>
						{format(addDays(new Date(date), 1), "eee, dd 'de' LLLL", {
							locale: ptBR,
						}).replace(/^\w/, (c) => c.toUpperCase())}
					</h3>
					{events
						.sort(
							(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
						)
						.map((event) => {
							const currentUser = userList?.find(
								(user) => user.id === event.user.id,
							)
							return (
								<Link
									key={event.id}
									href={`/app/challenges/${id}/event/${event.id}`}
								>
									<div className='flex flex-col items-center justify-between w-full max-w-lg px-4 py-1 mx-auto border rounded-md shadow-md bg-muted border-muted-foreground/10'>
										<div className='flex flex-row items-center justify-between w-full p-1'>
											<div className='flex flex-row gap-2'>
												<div className='relative'>
													<Avatar>
														<AvatarImage src={event.image} />
														<AvatarFallback>
															<div className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-600 to-black'>
																<BookOpen className='w-6 h-6 text-white' />
															</div>
														</AvatarFallback>
													</Avatar>
													<Avatar className='absolute bottom-0 right-0 w-5 h-5'>
														<AvatarImage
															src={
																currentUser?.publicMetadata?.imageUrl ||
																event.user.avatar
															}
														/>
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
														new Date(
															new Date(event.date).setHours(
																new Date(event.date).getHours() - 3,
															),
														),
														"hh:mm aaaaa'm",
													)}
												</span>
											</div>
										</div>
									</div>
								</Link>
							)
						})}
				</div>
			))}
		</main>
	)
}
