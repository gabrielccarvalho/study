import { Bell } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'
import { LandingNav } from './landing-nav'

export function Header() {
	return (
		<>
			<LandingNav />
			<section className='w-full py-6 sm:py-6 md:py-12 lg:py-24 xl:py-32'>
				<div className='container px-4 md:px-6'>
					<div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] mt-12 md:mt-0'>
						<div className='flex-col hidden object-cover mx-auto overflow-hidden shadow-lg md:flex bg-slate-800 aspect-video rounded-xl sm:w-full lg:order-last lg:aspect-square'>
							<div className='flex flex-row items-center justify-between p-4'>
								<div className='w-16 h-2 bg-purple-500 rounded-md' />
								<div className='flex flex-row items-center gap-2'>
									<div className='w-12 h-2 bg-indigo-500 rounded-full' />
									<div className='w-6 h-6 bg-indigo-500 rounded-full' />
								</div>
							</div>
							<Separator className='bg-white/50' />
							<div className='flex flex-row flex-1 px-2 py-4'>
								<div className='flex flex-col items-center justify-between h-full'>
									<div className='flex flex-col items-center gap-4'>
										<div className='w-5 h-5 bg-purple-500 rounded-lg' />
										<div className='w-5 h-5 bg-purple-500 rounded-lg' />
										<div className='w-5 h-5 bg-purple-500 rounded-lg' />
										<div className='w-5 h-5 bg-purple-500 rounded-lg' />
										<div className='w-5 h-5 bg-purple-500 rounded-lg' />
									</div>
									<div className='w-5 h-5 mb-4 bg-purple-500 rounded-lg' />
								</div>
								<Separator
									orientation='vertical'
									className='h-full ml-2 bg-white/50'
								/>
								<div className='flex flex-col flex-1 p-2'>
									<div className='w-16 h-2 bg-indigo-500 rounded-md' />
									<div className='flex items-end w-full h-48 max-w-full gap-2 px-4 mt-4 overflow-hidden border border-white rounded-lg'>
										<div className='w-4 h-20 bg-indigo-500 rounded-t-sm' />
										<div className='w-4 h-12 bg-indigo-500 rounded-t-sm' />
										<div className='w-4 h-10 bg-indigo-500 rounded-t-sm' />
										<div className='w-4 h-20 bg-indigo-500 rounded-t-sm' />
										<div className='w-4 h-24 bg-indigo-500 rounded-t-sm' />
										<div className='w-4 h-24 bg-indigo-500 rounded-t-sm' />
										<div className='w-4 h-32 bg-indigo-500 rounded-t-sm' />
										<div className='w-4 bg-indigo-500 rounded-t-sm h-44' />
										<div className='w-4 h-12 bg-indigo-500 rounded-t-sm' />
										<div className='w-4 h-32 bg-indigo-500 rounded-t-sm' />
										<div className='w-4 h-20 bg-indigo-500 rounded-t-sm' />
										<div className='w-4 h-12 bg-indigo-500 rounded-t-sm' />
										<div className='w-4 h-10 bg-indigo-500 rounded-t-sm' />
										<div className='w-4 h-20 bg-indigo-500 rounded-t-sm' />
										<div className='w-4 h-24 bg-indigo-500 rounded-t-sm' />
										<div className='w-4 h-24 bg-indigo-500 rounded-t-sm' />
										<div className='w-4 h-32 bg-indigo-500 rounded-t-sm' />
										<div className='w-4 bg-indigo-500 rounded-t-sm h-44' />
										<div className='w-4 h-12 bg-indigo-500 rounded-t-sm' />
										<div className='w-4 h-32 bg-indigo-500 rounded-t-sm' />
										<div className='w-4 h-6 bg-indigo-500 rounded-t-sm' />
									</div>
									<div className='w-16 h-2 mt-4 bg-indigo-500 rounded-lg' />
									<div className='w-32 h-2 mt-2 bg-indigo-500 rounded-lg' />
									<div className='flex flex-col w-full h-48 gap-2 px-1 py-2 mt-2 border border-white rounded-lg'>
										<div className='w-full h-3 bg-indigo-500 rounded-md' />
										<div className='w-full h-3 bg-indigo-700 rounded-md' />
										<div className='w-full h-3 bg-indigo-500 rounded-md' />
										<div className='w-full h-3 bg-indigo-700 rounded-md' />
										<div className='w-full h-3 bg-indigo-500 rounded-md' />
										<div className='w-full h-3 bg-indigo-700 rounded-md' />
										<div className='w-full h-3 bg-indigo-500 rounded-md' />
										<div className='w-full h-3 bg-indigo-700 rounded-md' />
										<div className='w-full h-3 bg-indigo-500 rounded-md' />
										<div className='w-full h-3 bg-indigo-700 rounded-md' />
									</div>
								</div>
							</div>
						</div>
						<div className='flex flex-col justify-center space-y-4'>
							<div className='space-y-2'>
								<h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
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
							<div className='flex flex-col gap-2 min-[400px]:flex-row'>
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
