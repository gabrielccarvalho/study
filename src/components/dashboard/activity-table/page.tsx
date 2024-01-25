'use client'

import { useChallenges } from '@/hooks/use-challenges'
import { useEvents } from '@/hooks/use-events'
import { useUser } from '@clerk/nextjs'
import { formatInTimeZone } from 'date-fns-tz'
import { ptBR } from 'date-fns/locale'
import { columns } from './columns'
import { DataTable } from './data-table'

export function ActivityDataTable() {
	const { user } = useUser()
	const { events } = useEvents()
	const { challenges } = useChallenges()

	if (!events || !challenges) return

	const userEvents = events
		.filter((event) => event.user.id === user?.id)
		.map((event) => ({ ...event }))

	const totalDuration = userEvents.reduce(
		(acc, event) => acc + event.duration,
		0,
	)

	const data = userEvents.map((event) => ({
		challenge:
			challenges.find((challenge) => challenge.id === event.challenge_id)
				?.title || 'Sem desafio',
		title: event.title,
		tags: event.tag,
		date: formatInTimeZone(
			new Date(event.date),
			'America/Sao_Paulo',
			"dd 'de' LLL",
			{
				locale: ptBR,
			},
		),
		duration: event.duration,
		id: event.id,
	}))

	return (
		<>
			<DataTable columns={columns} data={data} total={totalDuration} />
		</>
	)
}
