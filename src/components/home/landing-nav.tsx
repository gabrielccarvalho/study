import { ModeToggle } from '@/components/mode-toggle'
import Link from 'next/link'

export function LandingNav() {
	return (
		<div className='fixed top-0 z-50 flex items-center justify-between w-full p-4 mx-auto rounded-md backdrop-blur-md'>
			<Link href='/'>
				<span className='text-xl font-bold font-inter'>study</span>
			</Link>
			{/* <div className='flex flex-row items-center justify-around flex-1 max-w-xl'>
				<Link href='#features'>
					<span className='py-1 text-sm transition-all duration-100 '>
						Features
					</span>
				</Link>
				<Link href='#platform'>
					<span className='py-1 text-sm transition-all duration-100 '>
						Showcase
					</span>
				</Link>
				<Link href='/'>
					<span className='py-1 text-sm transition-all duration-100 '>
						Nosso Time
					</span>
				</Link>
			</div> */}
			<ModeToggle className='border-none backdrop-blur-md hover:bg-white/20' />
		</div>
	)
}
