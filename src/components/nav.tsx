'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useUser } from '@clerk/nextjs'
import { Bell, ChevronDown, LogOut } from 'lucide-react'
import Link from 'next/link'
import { ModeToggle } from './mode-toggle'
import { SearchBar } from './searchbar'

export function Nav() {
	const { user } = useUser()

	return (
		<div className='sticky top-0 left-0 right-0 flex flex-row items-center justify-between h-20 px-3 py-1 border-b-2 shadow-sm bg-background/80'>
			<Link href='/app'>
				<span className='font-semibold text-md'>study.app</span>
			</Link>
			<div className='flex flex-row items-center'>
				<SearchBar />
				<Button variant='ghost' className='hover:bg-transparent group'>
					<Bell
						size={21}
						strokeWidth={2.5}
						className='text-muted-foreground group-hover:text-primary'
					/>
					<div className='absolute w-2 h-2 mb-2.5 ml-2.5 bg-orange-500 rounded-full' />
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className='flex items-center cursor-pointer'>
							<div className='flex items-center justify-center p-1 border-2 rounded-full border-blue-500/50'>
								<Avatar className='w-6 h-6 cursor-pointer'>
									<AvatarImage src={user?.imageUrl} alt='user image' />
									<AvatarFallback />
								</Avatar>
							</div>
							<ChevronDown className='w-4 h-4 ml-1 text-muted-foreground' />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-48'>
						<DropdownMenuLabel>Minha conta</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem className='hover:cursor-pointer'>
								Perfil
							</DropdownMenuItem>
							<DropdownMenuItem className='hover:cursor-pointer'>
								Dashboard
							</DropdownMenuItem>
							<DropdownMenuItem className='hover:cursor-pointer'>
								Desafios
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuLabel>Aparência</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem className='flex flex-row justify-between'>
								<ModeToggle withText />
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem className='hover:cursor-pointer group'>
								<span className='group-hover:text-red-500'>Sair</span>
								<LogOut className='w-4 h-4 ml-2 group-hover:text-red-500' />
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}
