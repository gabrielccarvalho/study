'use client'

import { MoveUpRight } from 'lucide-react'
import Link from 'next/link'
import {
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import { Button } from '../ui/button'

const customData = [
	{
		name: 'Janeiro',
		Inglês: Math.round(Math.random() * 10000),
		Matemática: Math.round(Math.random() * 10000),
		Programação: Math.round(Math.random() * 10000),
	},
	{
		name: 'Fevereiro',
		Inglês: Math.round(Math.random() * 10000),
		Matemática: Math.round(Math.random() * 10000),
		Programação: Math.round(Math.random() * 10000),
	},
	{
		name: 'Março',
		Inglês: Math.round(Math.random() * 10000),
		Matemática: Math.round(Math.random() * 10000),
		Programação: Math.round(Math.random() * 10000),
	},
	{
		name: 'Abril',
		Inglês: Math.round(Math.random() * 10000),
		Matemática: Math.round(Math.random() * 10000),
		Programação: Math.round(Math.random() * 10000),
	},
	{
		name: 'Maio',
		Inglês: Math.round(Math.random() * 10000),
		Matemática: Math.round(Math.random() * 10000),
		Programação: Math.round(Math.random() * 10000),
	},
	{
		name: 'Junho',
		Inglês: Math.round(Math.random() * 10000),
		Matemática: Math.round(Math.random() * 10000),
		Programação: Math.round(Math.random() * 10000),
	},
]

export function Tracking() {
	return (
		<>
			<div
				id='features'
				className='flex flex-col justify-between gap-8 p-6 mx-auto md:mt-8 md:flex-row-reverse max-w-screen-2xl'
			>
				<div className='flex flex-col max-w-xl gap-10'>
					<div className='flex flex-col flex-1 gap-4'>
						<span className='text-4xl md:text-6xl '>
							Métricas de acompanhamento
						</span>
						<p className='max-w-sm font-light text-md '>
							Você pode acompanhar detalhadamente seu progresso em cada etiqueta
							personalizada que você criar.
						</p>
					</div>
					<Link href='/app' className='self-start'>
						<Button
							size='lg'
							className='self-start transition-all duration-100 bg-black dark:bg-white hover:dark:bg-white hover:bg-black hover:scale-110'
						>
							Acesse o app
							<MoveUpRight strokeWidth={1.5} className='w-5 h-5 ml-2' />
						</Button>
					</Link>
				</div>
				<div className='flex flex-col p-2 rounded-md md:w-1/2 h-96'>
					<ResponsiveContainer width='100%' height='100%'>
						<LineChart width={300} height={300} data={customData}>
							<XAxis dataKey='name' axisLine={false} hide />
							<YAxis axisLine={false} hide />
							<Tooltip
								contentStyle={{
									borderRadius: '10px',
									backgroundColor: 'transparent',
									backdropFilter: 'blur(5px)',
								}}
							/>
							<Line
								type='monotone'
								dataKey='Matemática'
								stroke='#f472b6'
								strokeWidth={3}
								dot={false}
								activeDot={{ r: 6 }}
							/>
							<Line
								type='monotone'
								dataKey='Inglês'
								stroke='#82ca9d'
								strokeWidth={3}
								dot={false}
								activeDot={{ r: 6 }}
							/>
							<Line
								type='monotone'
								dataKey='Programação'
								stroke='#6366f1'
								strokeWidth={3}
								dot={false}
								activeDot={{ r: 6 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</>
	)
}
