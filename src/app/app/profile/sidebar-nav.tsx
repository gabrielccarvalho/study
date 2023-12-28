'use client'

import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type SidebarNavProps = ComponentProps<'nav'>

const sidebarLinks = [
	{ href: '/app/profile', title: 'Profile' },
	{ href: '/app/profile/connections', title: 'Login Connections' },
]

export function SidebarNav({ className, ...props }: SidebarNavProps) {
	const pathname = usePathname()

	return (
		<nav className={twMerge('flex flex-col space-y-1', className)} {...props}>
			{sidebarLinks.map((link) => {
				return (
					<Link
						key={link.href}
						href={link.href}
						data-current={pathname === link.href}
						className={twMerge(
							buttonVariants({ variant: 'ghost' }),
							'justify-start hover:bg-transparent hover:underline',
							'data-[current=true]:bg-muted data-[current=true]:hover:bg-muted',
						)}
					>
						{link.title}
					</Link>
				)
			})}
		</nav>
	)
}
