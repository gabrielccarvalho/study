import Link from 'next/link'

export function LandingFooter() {
	return (
		<footer className='flex flex-col items-center w-full gap-2 px-4 py-6 border-t sm:flex-row shrink-0 md:px-6'>
			<p className='text-xs text-gray-500 dark:text-gray-400'>
				© study.app. All rights reserved.
			</p>
			<nav className='flex gap-4 sm:ml-auto sm:gap-6'>
				<Link className='text-xs hover:underline underline-offset-4' href='#'>
					Terms of Service
				</Link>
				<Link className='text-xs hover:underline underline-offset-4' href='#'>
					Privacy
				</Link>
			</nav>
		</footer>
	)
}
