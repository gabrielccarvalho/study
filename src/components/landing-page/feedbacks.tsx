'use client'

import { InfiniteMovingCards } from '../ui/infinite-moving-cards'

export function Testimonials() {
	return (
		<div className='h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden'>
			<InfiniteMovingCards
				items={testimonials}
				direction='right'
				speed='slow'
			/>
		</div>
	)
}

const testimonials = [
	{
		quote: 'Achei irado desenvolver isso aqui',
		name: 'Gabriel Campos',
		title: 'CTO - Fundador',
	},
	{
		quote: 'deu muito trabalho né',
		name: 'Larissa Cavalcanti',
		title: 'Namorada do CTO',
	},
	{
		quote: 'All that we see or seem is but a dream within a dream.',
		name: 'Edgar Allan Poe',
		title: 'A Dream Within a Dream',
	},
	{
		quote:
			'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
		name: 'Jane Austen',
		title: 'Pride and Prejudice',
	},
	{
		quote:
			'Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.',
		name: 'Herman Melville',
		title: 'Moby-Dick',
	},
]
