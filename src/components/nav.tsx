import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ModeToggle } from './mode-toggle'

export function Nav() {
	return (
		<div className='sticky top-0 left-0 right-0 flex flex-row items-center justify-between h-12 px-3 py-1 border-b shadow-md bg-background/80'>
			<Link href='/'>
				<span className='text-lg font-semibold'>study</span>
			</Link>
			<div className='flex flex-row items-center gap-2'>
				<ModeToggle />
				<UserButton afterSignOutUrl='/' />
			</div>
		</div>
	)
}
