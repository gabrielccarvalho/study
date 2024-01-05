'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useChallenge } from '@/context/challenge-context'
import { useUser } from '@clerk/nextjs'
import { format, isToday, isYesterday } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalculateAverageDuration } from './average-durations'

export function CardsMetric() {
	const { challenges } = useChallenge()
	const { user } = useUser()
	const averageDurations = CalculateAverageDuration()

	const data = averageDurations?.map((item) => {
		return {
			average: Math.round(Number(item.average)),
			today: item.today,
			date: item.date,
		}
	})

	const challengeList = challenges?.filter((challenge) =>
		challenge.members.includes(user?.id as string),
	)

	return (
		<Card className='flex-1 w-full'>
			<CardHeader className='flex flex-row items-start justify-between flex-1 w-full'>
				<div className='flex flex-col gap-1'>
					<CardTitle>Minutos de estudo</CardTitle>
					<CardDescription>
						Seus minutos de estudo em comparação com a média dos últimos 7 dias
					</CardDescription>
				</div>
				<Select>
					<SelectTrigger className='w-[200px]'>
						<SelectValue placeholder='Selecione um desafio' />
					</SelectTrigger>
					<SelectContent>
						{challengeList.map((challenge) => (
							<SelectItem key={challenge.id} value={challenge.id}>
								{challenge.title}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className='pb-4'>
				<div className='h-[300px]'>
					<ResponsiveContainer width='100%' height='100%'>
						<LineChart
							data={data}
							margin={{
								top: 5,
								right: 10,
								left: 10,
								bottom: 0,
							}}
						>
							<Tooltip
								content={({ active, payload }) => {
									if (active && payload && payload.length) {
										return (
											<div className='p-2 border rounded-lg shadow-sm bg-background'>
												<div className='grid grid-cols-2 gap-2'>
													<div className='flex flex-col items-center'>
														<span className='text-[0.70rem] uppercase text-muted-foreground'>
															Média geral
														</span>
														<span className='font-bold text-muted-foreground'>
															{payload[0].value} min
														</span>
													</div>
													<div className='flex flex-col items-center'>
														<span className='text-[0.70rem] uppercase text-muted-foreground'>
															estudados{' '}
															{isToday(payload[1].payload.date)
																? 'Hoje'
																: isYesterday(payload[1].payload.date)
																  ? 'Ontem'
																  : format(payload[1].payload.date, 'eee', {
																			locale: ptBR,
																	  })}
														</span>
														<span className='font-bold'>
															{payload[1].value} min
														</span>
													</div>
												</div>
											</div>
										)
									}

									return null
								}}
							/>
							<Line
								type='monotone'
								strokeWidth={2}
								dataKey='average'
								activeDot={{
									r: 6,
									style: { fill: 'var(--theme-primary)', opacity: 0.25 },
								}}
								style={
									{
										stroke: 'var(--theme-primary)',
										opacity: 0.25,
										'--theme-primary': 'hsl(var(--primary))',
									} as React.CSSProperties
								}
							/>
							<Line
								type='monotone'
								dataKey='today'
								strokeWidth={2}
								activeDot={{
									r: 8,
									style: { fill: 'var(--theme-primary)' },
								}}
								style={
									{
										stroke: 'var(--theme-primary)',
										'--theme-primary': 'hsl(var(--primary))',
									} as React.CSSProperties
								}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}
