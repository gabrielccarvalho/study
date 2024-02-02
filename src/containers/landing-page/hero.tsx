import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { JSX, SVGProps } from 'react'

export function HeroSection() {
	return (
		<section className='w-full py-6 bg-gray-200 dark:bg-black md:py-6 lg:py-12 xl:py-24'>
			<div className='container px-4 md:px-6'>
				<div className='grid items-center gap-6'>
					<div className='flex flex-col justify-center text-center md:space-y-8'>
						<div className='space-y-4'>
							<h2 className='text-4xl font-bold text-transparent bg-opacity-50 text-start md:text-center md:text-7xl bg-clip-text bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 from-neutral-950 to-neutral-600'>
								Nossas funcionalidades
							</h2>
							<p className='max-w-4xl mx-auto font-bold text-transparent bg-opacity-50 text-md md:text-center text-start md:text-2xl bg-clip-text bg-gradient-to-r dark:from-neutral-50 dark:to-neutral-400 from-neutral-950 to-neutral-600'>
								As funcionalidades do Study.app foram pensadas para facilitar o
								seu dia-a-dia e tornar o seu estudo mais divertido sem perder a
								qualidade.
							</p>
						</div>
						<div className='w-full max-w-full mx-auto space-y-4'>
							<div className='grid items-stretch max-w-5xl gap-6 py-12 mx-auto lg:grid-cols-3 lg:gap-12'>
								<Card className='flex flex-col items-center p-6 space-y-4 transition-all duration-200 ease-in-out group hover:border-emerald-500 hover:scale-105'>
									<BarChart2Icon className='w-12 h-12 transition-all duration-200 ease-in-out group-hover:text-emerald-500' />
									<CardTitle className='mb-2'>Métricas</CardTitle>
									<CardDescription className='text-center'>
										Use nossas métricas para acompanhar seu progresso e
										identificar áreas para melhorar. Nossa plataforma conta com
										gráficos e tabelas para você se manter motivado e focado.
									</CardDescription>
								</Card>
								<Card className='flex flex-col items-center p-6 space-y-4 transition-all duration-200 ease-in-out group hover:border-yellow-500 hover:scale-105'>
									<TrophyIcon className='w-12 h-12 transition-all duration-200 ease-in-out group-hover:text-yellow-500' />
									<CardTitle className='mb-2'>Desafie seus amigos</CardTitle>
									<CardDescription className='text-center'>
										Nossa plataforma conta com um sistema de desafios, onde você
										pode criar desafios e convidar seus amigos para participar.
									</CardDescription>
								</Card>
								<Card className='flex flex-col items-center p-6 space-y-4 transition-all duration-200 ease-in-out group hover:border-indigo-500 hover:scale-105'>
									<TrendingUpIcon className='w-12 h-12 transition-all duration-200 ease-in-out group-hover:text-indigo-500' />
									<CardTitle className='mb-2'>Monitore seu Progresso</CardTitle>
									<CardDescription className='text-center'>
										Monitore seu progresso diáriamente e veja como você está
										evoluindo.
									</CardDescription>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function BarChart2Icon(
	props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<line x1='18' x2='18' y1='20' y2='10' />
			<line x1='12' x2='12' y1='20' y2='4' />
			<line x1='6' x2='6' y1='20' y2='14' />
		</svg>
	)
}

function TrophyIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='M6 9H4.5a2.5 2.5 0 0 1 0-5H6' />
			<path d='M18 9h1.5a2.5 2.5 0 0 0 0-5H18' />
			<path d='M4 22h16' />
			<path d='M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22' />
			<path d='M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22' />
			<path d='M18 2H6v7a6 6 0 0 0 12 0V2Z' />
		</svg>
	)
}

function TrendingUpIcon(
	props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<polyline points='22 7 13.5 15.5 8.5 10.5 2 17' />
			<polyline points='16 7 22 7 22 13' />
		</svg>
	)
}
