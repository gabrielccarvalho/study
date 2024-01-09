'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { format, getDay, isToday, isYesterday, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'
import { CalculateAverageDuration } from './average-durations'
import { CalendarDateRangePicker } from './date-range-picker'

export function CardsMetric() {
	const [range, setRange] = useState<DateRange | undefined>({
		from: subDays(new Date(), 7),
		to: new Date(),
	})
	const averageDurations = CalculateAverageDuration()

	const data = averageDurations?.map((item) => {
		return {
			average: Math.round(Number(item.average)),
			today: item.today,
			date: item.date,
		}
	})

	const filteredData = data?.filter((item) => {
		if (range?.from && range?.to) {
			return item.date >= range.from && item.date <= range.to
		}
		return item
	})

	return (
		<Card className='flex-1 w-full'>
			<CardHeader className='flex flex-row items-start justify-between flex-1 w-full'>
				<div className='flex flex-col gap-1'>
					<CardTitle>Minutos de estudo</CardTitle>
					<CardDescription>
						Seus minutos de estudo em comparação com a média dos últimos 7 dias
					</CardDescription>
				</div>
				<div>
					<CalendarDateRangePicker updateRange={setRange} />
				</div>
			</CardHeader>
			<CardContent className='pb-4'>
				<div className='h-[300px]'>
					<ResponsiveContainer width='100%' height='100%'>
						<LineChart
							data={filteredData}
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
																  : format(
																			payload[1].payload.date,
																			"eee',' dd/MM",
																			{
																				locale: ptBR,
																			},
																	  )}
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
