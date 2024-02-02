import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { LandingNav } from './landing-nav'

export function Header() {
	return (
		<>
			<LandingNav />
			<div className='h-[25rem] md:h-[40rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center'>
				<div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]' />
				<div className='relative z-10 w-full p-4 pt-20 mx-auto max-w-7xl md:pt-0'>
					<h1 className='text-4xl font-bold text-center text-transparent bg-opacity-50 md:text-7xl bg-clip-text bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 from-neutral-950 to-neutral-600'>
						Deixe seus estudos mais{' '}
						<span className=' bg-clip-text animate-gradient-swap'>
							divertidos
						</span>{' '}
						sem perder o foco.
					</h1>
					<div className='flex justify-center gap-2 mt-12'>
						<Link href='/app'>
							<Button className='px-8 py-5 text-md'>Começe agora</Button>
						</Link>
						<Button className='px-8 py-5 text-md' variant='outline'>
							Saiba mais
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
