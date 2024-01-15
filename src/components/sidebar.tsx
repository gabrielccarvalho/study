'use client'

import { Button } from '@/components/ui/button'
import { GanttChartSquare, ShoppingBasket, Swords, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Sidebar() {
	const pathname = usePathname()

	return (
		<div className='fixed bottom-0 z-10 flex items-center justify-between w-full py-4 border-t-2 shadow-lg backdrop-blur-md md:shadow-none md:py-8 md:border-t-0 md:border-r-2 md:w-20 md:flex-col md:top-20 border-border/80'>
			<div className='flex items-center w-full gap-4 px-4 pr-20 md:gap-6 md:pr-0 md:flex-col md:px-0'>
				<Link href='/app' className='w-full'>
					<Button
						variant='ghost'
						aria-selected={pathname === '/app'}
						className='w-full border-b-2 rounded-none md:border-b-0 md:border-r-2 border-r-transparent hover:bg-transparent hover:border-blue-200 aria-selected:border-blue-500'
					>
						<GanttChartSquare className='w-5 h-5 md:w-6 md:h-6' />
						<span className='sr-only'>Dashboard</span>
					</Button>
				</Link>
				<Link href='/app/challenges' className='w-full'>
					<Button
						variant='ghost'
						aria-selected={
							pathname === '/app/challenges' ||
							pathname.startsWith('/app/challenge')
						}
						className='w-full border-b-2 rounded-none md:border-b-0 md:border-r-2 border-r-transparent hover:bg-transparent hover:border-blue-200 aria-selected:border-blue-500'
					>
						<Swords className='w-5 h-5 md:w-6 md:h-6' />
						<span className='sr-only'>Desafios</span>
					</Button>
				</Link>
				<Link href='/app/store' className='w-full'>
					<Button
						variant='ghost'
						aria-selected={
							pathname === '/app/store' || pathname.startsWith('/app/store')
						}
						className='w-full border-b-2 rounded-none md:border-b-0 md:border-r-2 border-r-transparent hover:bg-transparent hover:border-blue-200 aria-selected:border-blue-500'
					>
						<ShoppingBasket className='w-5 h-5 md:w-6 md:h-6' />
						<span className='sr-only'>Aprender</span>
					</Button>
				</Link>
				{/* <Button
					variant='ghost'
					disabled
					className='w-full border-b-2 rounded-none md:border-b-0 md:border-r-2 border-r-transparent hover:bg-transparent hover:border-blue-200 aria-selected:border-blue-500'
				>
					<Video className='w-5 h-5 md:w-6 md:h-6' />
					<span className='sr-only'>Aulas</span>
				</Button> */}
				<Link href='/app/profile' className='w-full'>
					<Button
						variant='ghost'
						aria-selected={pathname === '/app/profile'}
						className='w-full border-b-2 rounded-none md:border-b-0 md:border-r-2 border-r-transparent hover:bg-transparent hover:border-blue-200 aria-selected:border-blue-500'
					>
						<User className='w-5 h-5 md:w-6 md:h-6' />
						<span className='sr-only'>Perfil</span>
					</Button>
				</Link>
			</div>
			{/* <Button variant='ghost' className='hover:bg-transparent'>
				<Settings className='w-5 h-5 md:w-6 md:h-6' />
			</Button> */}
		</div>
	)
}
