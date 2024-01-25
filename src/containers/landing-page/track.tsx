'use client'

import { isToday, isYesterday } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { ptBR } from 'date-fns/locale'
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
	{
		average: 720,
		today: 590,
		date: new Date(2024, 1, 1),
	},
	{
		average: 610,
		today: 640,
		date: new Date(2024, 1, 2),
	},
	{
		average: 492,
		today: 652,
		date: new Date(2024, 1, 3),
	},
	{
		average: 932,
		today: 702,
		date: new Date(2024, 1, 4),
	},
	{
		average: 620,
		today: 750,
		date: new Date(2024, 1, 5),
	},
	{
		average: 452,
		today: 820,
		date: new Date(2024, 1, 6),
	},
	{
		average: 589,
		today: 910,
		date: new Date(2024, 1, 7),
	},
]

export function StudyTrack() {
	return (
		<section className='w-full py-4 md:py-10 lg:py-16'>
			<div className='container px-4 md:px-6'>
				<div className='flex flex-col items-center justify-center space-y-4 text-center'>
					<div className='space-y-2'>
						<h2 className='text-2xl font-bold tracking-tighter text-transparent bg-black text-start md:text-center sm:text-4xl md:text-5xl bg-clip-text bg-gradient-to-r dark:from-gray-400 dark:to-white'>
							Acompanhe seu tempo de estudo
						</h2>
						<p className='mx-auto text-sm text-gray-500 text-start md:text-center md:max-w-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
							Veja sua evolução diária através de gráficos e tabelas detalhadas.
						</p>
					</div>
				</div>
				<div className='flex flex-col flex-1 mt-16 h-96'>
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
																  : formatInTimeZone(
																			payload[1].payload.date,
																			"eee',' dd/MM",
																			'America/Sao_Paulo',
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
			</div>
		</section>
	)
}
