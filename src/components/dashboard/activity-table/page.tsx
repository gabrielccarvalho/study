'use client'

import { useChallenge } from '@/context/challenge-context'
import { useUser } from '@clerk/nextjs'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { columns } from './columns'
import { DataTable } from './data-table'

export function ActivityDataTable() {
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

	const data = userEvents.map((event) => ({
		challenge: event.challengeName,
		title: event.title,
		tags: event.tag,
		date: format(new Date(event.date), "dd 'de' LLL", { locale: ptBR }),
		duration: event.duration,
	}))

	return (
		<>
			<DataTable columns={columns} data={data} total={totalDuration} />
		</>
	)
}
