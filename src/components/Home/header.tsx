import { Button } from '@/components/ui/button'
import { Lock, MoveRight, MoveUpRight } from 'lucide-react'
import Link from 'next/link'
import { Separator } from '../ui/separator'
import { LandingNav } from './landing-nav'

export function Header() {
	return (
		<>
			<LandingNav />
			<div className='flex flex-row items-center justify-between flex-1 p-16 transition-all duration-100 rounded-b-md bg-gradient-to-br from-yellow-400/85 via-pink-400/85 to-indigo-400/85 dark:from-yellow-500/85 dark:via-pink-500/85 dark:to-indigo-500/85'>
				<div className='flex flex-col justify-center gap-8 p-16 mx-auto mb-12 max-w-screen-2xl'>
					<div className='flex flex-col items-center justify-center flex-1 max-w-3xl gap-4'>
						<h1 className='font-normal leading-tight text-center text-7xl font-geist'>
							Torne seu estudo mais divertido!
						</h1>
						<span className='max-w-lg font-light text-center font-geist'>
							Estude, acumule pontos e compita com seus amigos! Acesse o app e
							comece a aprender de forma divertida.
						</span>
					</div>
					<div className='flex items-center justify-center flex-1'>
						<Link href='/app'>
							<Button className='flex flex-row items-center justify-start transition-all duration-100 bg-black dark:bg-white hover:bg-black hover:dark:bg-white group hover:scale-110'>
								Confira agora!
								<MoveRight
									strokeWidth={1.5}
									className='w-6 h-6 ml-2 mr-2 transition-all duration-100 group-hover:mr-0 group-hover:ml-4'
								/>
							</Button>
						</Link>
					</div>
				</div>
			</div>
			<div className='flex flex-row items-stretch justify-around max-w-5xl px-4 py-2 pb-6 mx-auto -mt-20 border border-b-0 rounded-md bg-white/20 border-white/20 backdrop-blur-sm'>
				<div className='flex flex-col flex-1 gap-10 px-2 max-w-56'>
					<div className='flex flex-col gap-2 py-2'>
						<span className='text-xl font-geist'>Competir</span>
						<p className='text-xs font-light font-geist'>
							Plataforma de acompanhamento
						</p>
					</div>
					<div className='flex flex-row items-center justify-between'>
						<span className='text-lg font-geist'>Acesse o app</span>
						<Link href='/app'>
							<Button
								size='icon'
								className='w-8 h-8 transition-all duration-100 bg-black rounded-full dark:bg-white hover:bg-black hover:dark:bg-white hover:scale-110'
							>
								<MoveUpRight strokeWidth={1.5} className='w-5 h-5' />
							</Button>
						</Link>
					</div>
				</div>
				<Separator
					orientation='vertical'
					className='self-center h-16 mx-4 bg-foreground/10'
				/>
				<div className='flex flex-col flex-1 gap-10 px-2 max-w-56'>
					<div className='flex flex-col gap-2 py-2'>
						<span className='text-xl font-geist'>Estudar</span>
						<p className='text-xs font-light font-geist'>
							Plataforma de estudos
						</p>
					</div>
					<div className='flex flex-row items-center justify-between'>
						<span className='text-lg font-geist'>Em breve</span>
						<Button
							disabled
							size='icon'
							className='w-8 h-8 bg-black rounded-full dark:bg-white hover:bg-black hover:dark:bg-white'
						>
							<Lock strokeWidth={1.5} className='w-4 h-4' />
						</Button>
					</div>
				</div>
				<Separator
					orientation='vertical'
					className='self-center h-16 mx-4 bg-foreground/10'
				/>
				<div className='flex flex-col flex-1 gap-10 px-2 max-w-56'>
					<div className='flex flex-col gap-2 py-2'>
						<span className='text-xl font-geist'>Aprender</span>
						<p className='text-xs font-light font-geist'>Plataforma de aulas</p>
					</div>
					<div className='flex flex-row items-center justify-between'>
						<span className='text-lg font-geist'>Em breve</span>
						<Button
							size='icon'
							disabled
							className='w-8 h-8 bg-black rounded-full dark:bg-white hover:bg-black hover:dark:bg-white'
						>
							<Lock strokeWidth={1.5} className='w-4 h-4' />
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
