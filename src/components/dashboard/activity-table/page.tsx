'use client'

import { useChallenges } from '@/hooks/use-challenges'
import { useEvents } from '@/hooks/use-events'
import { formatWithOffset } from '@/utils/format-timezone'
import { useUser } from '@clerk/nextjs'
import { formatInTimeZone } from 'date-fns-tz'
import { ptBR } from 'date-fns/locale'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Loading } from './loading'

export function ActivityDataTable() {
	const { user } = useUser()
	const { events, isLoading: isLoadingEvents } = useEvents()
	const { challenges, isLoading: isLoadingChallenges } = useChallenges()

	if (isLoadingEvents || isLoadingChallenges) {
		return <Loading />
	}

	const userEvents = events
		?.filter((event) => event.user.id === user?.id)
		.map((event) => ({ ...event }))

	const data = userEvents?.map((event) => ({
		challenge:
			challenges?.find((challenge) => challenge.id === event.challenge_id)
				?.title || 'Sem desafio',
		title: event.title,
		tags: event.tag,
		date: formatInTimeZone(
			new Date(formatWithOffset(event.date, 3)),
			'America/Sao_Paulo',
			"dd 'de' LLL",
			{
				locale: ptBR,
			},
		),
		duration: event.duration,
		id: event.id,
	}))

	return data && <DataTable columns={columns} data={data} />
}
