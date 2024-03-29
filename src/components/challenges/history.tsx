'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useClerkUsers } from '@/hooks/use-clerk-users'
import { useEvents } from '@/hooks/use-events'
import { formatWithOffset } from '@/utils/format-timezone'
import { Event } from '@/utils/types'
import { addDays, format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import ptBR from 'date-fns/locale/pt-BR'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import { LoadingSkeleton } from './loading'

export function ChallengeHistory({ id }: { id: string }) {
	const { events, isLoading } = useEvents()
	const { userList } = useClerkUsers()

	if (isLoading) {
		return <LoadingSkeleton />
	}

	const challengeEvents =
		events
			?.filter((evt) => evt.challenge_id === id)
			.reduce((acc: { [x: string]: Event[] }, event) => {
				const eventDate = format(
					utcToZonedTime(
						new Date(formatWithOffset(event.date, 3)),
						'America/Sao_Paulo',
					),
					'yyyy-MM-dd',
				)

				if (!acc[eventDate]) {
					acc[eventDate] = []
				}

				acc[eventDate].push(event)

				return acc
			}, {}) || {}

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
						{format(
							utcToZonedTime(addDays(new Date(date), 1), 'America/Sao_Paulo'),
							"eee, dd 'de' LLLL",
							{
								locale: ptBR,
							},
						).replace(/^\w/, (c) => c.toUpperCase())}
					</h3>
					{events
						.sort(
							(a, b) =>
								new Date(formatWithOffset(b.date, -3)).getTime() -
								new Date(formatWithOffset(a.date, -3)).getTime(),
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
													<span className='truncate max-w-48 md:max-w-80 text-md'>
														{event.title}
													</span>
													<span className='text-xs font-light md:text-sm'>
														{event.user.username}
													</span>
												</div>
											</div>
											<div className='flex flex-row self-end'>
												<span className='text-xs font-thin'>
													{format(
														utcToZonedTime(
															new Date(formatWithOffset(event.date, 3)),
															'America/Sao_Paulo',
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
