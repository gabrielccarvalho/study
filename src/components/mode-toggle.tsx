'use client'

import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { twMerge } from 'tailwind-merge'

export function ModeToggle({
	className,
	withText = false,
}: { className?: string; withText?: boolean }) {
	const [mounted, setMounted] = useState(false)
	const { setTheme, theme } = useTheme()

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<Button
			variant='outline'
			size={withText ? 'default' : 'icon'}
			className={
				withText
					? twMerge(
							'flex justify-between items-center w-full px-0 pr-1 border-none shadow-none',
							className,
					  )
					: className
			}
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
		>
			{withText && <span className='text-xs font-semibold'>Tema</span>}
			<SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
			<MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 right-3' />
			<span className='sr-only'>Toggle theme</span>
		</Button>
	)
}
