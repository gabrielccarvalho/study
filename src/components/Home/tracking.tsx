'use client'

import { MoveUpRight } from 'lucide-react'
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
		Programação: Math.round(Math.random() * 10000),
	},
	{
		name: 'Fevereiro',
		Inglês: Math.round(Math.random() * 10000),
		Programação: Math.round(Math.random() * 10000),
	},
	{
		name: 'Março',
		Inglês: Math.round(Math.random() * 10000),
		Programação: Math.round(Math.random() * 10000),
	},
	{
		name: 'Abril',
		Inglês: Math.round(Math.random() * 10000),
		Programação: Math.round(Math.random() * 10000),
	},
	{
		name: 'Maio',
		Inglês: Math.round(Math.random() * 10000),
		Programação: Math.round(Math.random() * 10000),
	},
	{
		name: 'Junho',
		Inglês: Math.round(Math.random() * 10000),
		Programação: Math.round(Math.random() * 10000),
	},
]

export function Tracking() {
	return (
		<>
			<div className='flex flex-row-reverse gap-8 p-6 mx-auto mt-8 max-w-7xl'>
				<div className='flex flex-col max-w-xl gap-8'>
					<span className='text-6xl font-geist'>
						Métricas de acompanhamento
					</span>
					<p className='max-w-sm font-light text-md font-geist'>
						Você pode acompanhar detalhadamente seu progresso em cada etiqueta
						personalizada que você criar, além de poder acompanhar seus amigos.
					</p>
					<Button
						size='lg'
						className='self-start transition-all duration-100 hover:scale-110'
					>
						Acesse o app
						<MoveUpRight strokeWidth={1.5} className='w-5 h-5 ml-2' />
					</Button>
				</div>
				<div className='flex flex-col w-full p-2 rounded-md h-96'>
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
								dataKey='Programação'
								stroke='#f472b6'
								strokeWidth={2}
								activeDot={{ r: 6 }}
							/>
							<Line
								type='monotone'
								dataKey='Inglês'
								stroke='#82ca9d'
								strokeWidth={2}
								activeDot={{ r: 6 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</>
	)
}
