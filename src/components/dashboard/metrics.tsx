'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { format, isToday, isYesterday } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const data = [
	{
		average: 500,
		today: 240,
	},
	{
		average: 300,
		today: 139,
	},
	{
		average: 200,
		today: 980,
	},
	{
		average: 278,
		today: 390,
	},
	{
		average: 189,
		today: 480,
	},
	{
		average: 239,
		today: 380,
	},
	{
		average: 349,
		today: 430,
	},
]

export function CardsMetric() {
	const date = new Date() // REPLACE
	return (
		<Card className='flex-1'>
			<CardHeader>
				<CardTitle>Minutos de estudo</CardTitle>
				<CardDescription>
					Seus minutos de estudo em comparação com a média dos últimos 7 dias
				</CardDescription>
			</CardHeader>
			<CardContent className='pb-4'>
				<div className='h-[200px]'>
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
													<div className='flex flex-col'>
														<span className='text-[0.70rem] uppercase text-muted-foreground'>
															Média
														</span>
														<span className='font-bold text-muted-foreground'>
															{payload[0].value}
														</span>
													</div>
													<div className='flex flex-col'>
														<span className='text-[0.70rem] uppercase text-muted-foreground'>
															{isToday(date)
																? 'Hoje'
																: isYesterday(date)
																  ? 'Ontem'
																  : format(date, 'eee', { locale: ptBR })}
														</span>
														<span className='font-bold'>
															{payload[1].value}
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
