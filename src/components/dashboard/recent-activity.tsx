'use client'

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useChallenge } from '@/context/challenge-context'
import { useUser } from '@clerk/nextjs'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function ActivityTable() {
	const { challenges } = useChallenge()
	const { user } = useUser()

	const userEvents = challenges
		.filter((challenge) => challenge.members.includes(user?.id as string))
		.flatMap((challenge) =>
			challenge.events
				.filter((event) => event.user.id === user?.id)
				.map((event) => ({ ...event, challengeName: challenge.title })),
		)

	const totalDuration = userEvents.reduce(
		(acc, event) => acc + event.duration,
		0,
	)

	return (
		<>
			<Table>
				<TableCaption>Suas atividades recentes na plataforma.</TableCaption>
				<TableHeader>
					<TableRow className='gap-2'>
						<TableHead className='w-1/4'>Desafio</TableHead>
						<TableHead className='w-1/4'>Título</TableHead>
						<TableHead className='w-1/4'>Data</TableHead>
						<TableHead className='w-1/4 text-right'>Tempo</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{userEvents.map((event) => (
						<TableRow className='gap-2' key={event.id}>
							<TableCell className='w-1/4'>{event.challengeName}</TableCell>
							<TableCell className='w-1/4'>{event.title}</TableCell>
							<TableCell className='w-1/4'>
								{format(new Date(event.date), "dd 'de' LLL", { locale: ptBR })}
							</TableCell>
							<TableCell className='w-1/4 text-right'>
								{event.duration} min
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={3}>Total</TableCell>
						<TableCell className='text-right'>{totalDuration} min</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</>
	)
}
