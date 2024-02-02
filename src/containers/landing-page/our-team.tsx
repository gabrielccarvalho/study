'use client'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'
import { cn } from '@/utils/cn'
import React from 'react'
const people = [
	{
		id: 1,
		name: 'Gabriel Campos',
		designation: 'CTO',
		image: '/gabriel.jpeg',
	},
	{
		id: 2,
		name: 'Gabriel Campos',
		designation: 'CEO',
		image: '/me.jpeg',
	},
	{
		id: 3,
		name: 'Gabriel Campos',
		designation: 'Designer',
		image: '/eu.jpeg',
	},
	{
		id: 4,
		name: 'Gabriel Campos',
		designation: 'Marketing',
		image: '/campos.jpeg',
	},
]

export function OurTeam() {
	return (
		<section className='flex flex-col justify-center px-4 mx-auto md:items-center max-w-screen-2xl md:px-auto'>
			<div className='flex flex-col gap-12 mx-auto max-w-screen-2xl'>
				<h2 className='text-4xl font-bold text-transparent bg-opacity-50 text-start md:text-center md:text-7xl bg-clip-text bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 from-neutral-950 to-neutral-600'>
					Nosso time
				</h2>
				<div className='flex flex-row items-center justify-center w-full md:mb-10'>
					<AnimatedTooltip items={people} />
				</div>
				<div className='flex flex-row items-center justify-center w-full mb-10'>
					<p className='max-w-4xl font-bold text-transparent bg-opacity-50 text-md md:text-center md:text-2xl bg-clip-text bg-gradient-to-r dark:from-neutral-50 dark:to-neutral-400 from-neutral-950 to-neutral-600'>
						Conheça o time que está por trás de toda a mágica.
						<br />
						Não se espante com nossa semelhança, juro que somos pessoas
						diferentes, apenas muito parecidas e com o mesmo nome.
					</p>
				</div>
			</div>
		</section>
	)
}
