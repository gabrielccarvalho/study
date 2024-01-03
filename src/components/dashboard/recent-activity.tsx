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
					<TableRow>
						<TableHead>Desafio</TableHead>
						<TableHead>Título</TableHead>
						<TableHead>Tags</TableHead>
						<TableHead className='text-right'>Tempo</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{userEvents.map((event) => (
						<TableRow key={event.id}>
							<TableCell>{event.challengeName}</TableCell>
							<TableCell>{event.title}</TableCell>
							<TableCell />
							<TableCell className='text-right'>{event.duration} min</TableCell>
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
