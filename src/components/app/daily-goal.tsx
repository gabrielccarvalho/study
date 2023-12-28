'use client'

import { Button } from '@/components/ui/button'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { Bar, BarChart, ResponsiveContainer } from 'recharts'

const data = [
	{
		goal: 400,
	},
	{
		goal: 300,
	},
	{
		goal: 200,
	},
	{
		goal: 300,
	},
	{
		goal: 200,
	},
	{
		goal: 278,
	},
	{
		goal: 189,
	},
	{
		goal: 239,
	},
	{
		goal: 300,
	},
	{
		goal: 200,
	},
	{
		goal: 278,
	},
	{
		goal: 189,
	},
	{
		goal: 349,
	},
]

export function DailyGoal() {
	const [goal, setGoal] = useState(240)

	function handleOnClick(adjustment: number) {
		setGoal(Math.max(60, Math.min(720, goal + adjustment)))
	}
	return (
		<div className='flex flex-col items-center w-full max-w-sm'>
			<span className='text-2xl font-semibold'>Meta diária</span>
			<p className='text-sm text-center text-muted-foreground'>
				Defina sua meta diária de estudo!
			</p>
			<div className='w-full p-4'>
				<div className='flex items-center justify-center space-x-2'>
					<Button
						variant='outline'
						size='icon'
						className='w-6 h-6 rounded-full shrink-0'
						onClick={() => handleOnClick(-60)}
						disabled={goal <= 60}
					>
						<MinusIcon className='w-3 h-3' />
						<span className='sr-only'>Diminuir</span>
					</Button>
					<div className='flex-1 text-center'>
						<div className='text-4xl font-bold tracking-tighter'>{goal}</div>
						<div className='text-[0.60rem] uppercase text-muted-foreground'>
							Minutos por dia
						</div>
					</div>
					<Button
						variant='outline'
						size='icon'
						className='w-6 h-6 rounded-full shrink-0'
						onClick={() => handleOnClick(60)}
						disabled={goal >= 720}
					>
						<PlusIcon className='w-3 h-3' />
						<span className='sr-only'>Aumentar</span>
					</Button>
				</div>
				<div className='h-20 mt-3'>
					<ResponsiveContainer width='100%' height='100%'>
						<BarChart data={data}>
							<Bar
								dataKey='goal'
								style={
									{
										fill: 'hsl(var(--primary))',
										opacity: 0.8,
									} as React.CSSProperties
								}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	)
}
