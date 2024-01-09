'use client'

import { Button } from '@/components/ui/button'
import {
	GanttChartSquare,
	Settings,
	ShoppingBasket,
	Swords,
	User,
	Video,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Sidebar() {
	const pathname = usePathname()

	return (
		<div className='fixed bottom-0 flex flex-col items-center justify-between w-20 py-8 border-r-2 top-20 border-border/80'>
			<div className='flex flex-col items-center w-full gap-6'>
				<Link href='/app' className='w-full'>
					<Button
						variant='ghost'
						aria-selected={pathname === '/app'}
						className='w-full border-r-2 rounded-none border-r-transparent hover:bg-transparent hover:border-blue-200 aria-selected:border-blue-500'
					>
						<GanttChartSquare className='w-6 h-6' />
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
						className='w-full border-r-2 rounded-none border-r-transparent hover:bg-transparent hover:border-blue-200 aria-selected:border-blue-500'
					>
						<Swords className='w-6 h-6' />
						<span className='sr-only'>Desafios</span>
					</Button>
				</Link>
				<Link href='/app/store' className='w-full'>
					<Button
						variant='ghost'
						aria-selected={
							pathname === '/app/store' || pathname.startsWith('/app/store')
						}
						className='w-full border-r-2 rounded-none border-r-transparent hover:bg-transparent hover:border-blue-200 aria-selected:border-blue-500'
					>
						<ShoppingBasket className='w-6 h-6' />
						<span className='sr-only'>Aprender</span>
					</Button>
				</Link>
				<Button
					variant='ghost'
					disabled
					className='w-full border-r-2 rounded-none border-r-transparent hover:bg-transparent hover:border-blue-200 aria-selected:border-blue-500'
				>
					<Video className='w-6 h-6' />
					<span className='sr-only'>Aulas</span>
				</Button>
				<Link href='/app/profile' className='w-full'>
					<Button
						variant='ghost'
						aria-selected={pathname === '/app/profile'}
						className='w-full border-r-2 rounded-none border-r-transparent hover:bg-transparent hover:border-blue-200 aria-selected:border-blue-500'
					>
						<User className='w-6 h-6' />
						<span className='sr-only'>Perfil</span>
					</Button>
				</Link>
			</div>
			<Button variant='ghost' className='hover:bg-transparent'>
				<Settings className='w-6 h-6' />
			</Button>
		</div>
	)
}
