'use client'

import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'

export function Nav() {
	const { isSignedIn } = useUser()

	return (
		<div className='sticky top-0 left-0 right-0 flex flex-row items-center justify-between h-12 px-3 py-1 border-b shadow-md bg-background/80'>
			<Link href={isSignedIn ? '/app' : '/'}>
				<span className='text-lg font-semibold'>study</span>
			</Link>
			<div className='flex flex-row items-center gap-4'>
				{isSignedIn ? (
					<UserButton afterSignOutUrl='/' />
				) : (
					<SignInButton afterSignInUrl='/app' mode='modal'>
						<Button size='sm' className='text-sm font-semibold'>
							Entrar
						</Button>
					</SignInButton>
				)}
				<ModeToggle />
			</div>
		</div>
	)
}
