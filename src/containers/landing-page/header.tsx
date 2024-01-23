import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { LandingNav } from './landing-nav'

export function Header() {
	return (
		<>
			<LandingNav />
			<section className='w-full py-6 sm:py-6 md:py-12 lg:py-24 xl:py-32'>
				<div className='container px-4 md:px-6'>
					<div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] mt-12 md:mt-0'>
						<div className='flex-col hidden object-cover mx-auto overflow-hidden md:flex aspect-video rounded-xl sm:w-full lg:order-last lg:aspect-square'>
							<Image
								src='loom.svg'
								width={600}
								height={600}
								alt='Landing illustration'
							/>
						</div>
						<div className='flex flex-col justify-center space-y-4'>
							<div className='space-y-2'>
								<h1 className='text-3xl font-bold tracking-tighter text-transparent bg-black sm:text-5xl xl:text-6xl/none bg-clip-text bg-gradient-to-r dark:from-gray-400 dark:to-white'>
									Deixe seus estudos mais{' '}
									<span className='px-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500'>
										divertidos
									</span>{' '}
									sem perder o foco.
								</h1>
								<p className='max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400'>
									Estude de forma leve e divertida, com métricas e gráficos para
									te auxiliar a identificar onde melhorar. Junte-se a nós e leve
									seus estudos para o próximo nível.
								</p>
							</div>
							<div className='flex gap-2 min-[400px]:flex-row'>
								<Link href='/app'>
									<Button size='lg'>Começe agora</Button>
								</Link>
								<Button variant='outline' size='lg'>
									Saiba mais
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
