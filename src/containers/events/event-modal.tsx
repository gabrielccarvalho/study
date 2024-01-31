'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'
import { useEvents } from '@/hooks/use-events'
import { useMediaQuery } from '@/hooks/use-media-query'
import { formatWithOffset } from '@/utils/format-timezone'
import { useUser } from '@clerk/nextjs'
import { formatInTimeZone } from 'date-fns-tz'
import Image from 'next/image'
import { useState } from 'react'

export function EventModal({ id }: { id: string }) {
	const [open, setOpen] = useState(false)
	const { user } = useUser()
	const { events } = useEvents()
	const isDesktop = useMediaQuery('(min-width: 768px)')

	const event = events?.find((event) => event.id === id)

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<span>Ver detalhes</span>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<div className='flex flex-col flex-1'>
						<Image
							src={event?.image || '/event-placeholder.svg'}
							alt='event image'
							width={500}
							height={500}
							quality={100}
							priority
							className='shadow-md rounded-t-md'
						/>
						<div className='flex flex-col w-full max-w-md px-4 py-2 border border-t-0 shadow-lg bg-muted rounded-b-md border-muted-foreground/10'>
							<div className='flex flex-row items-center justify-between'>
								<div className='flex flex-row items-center'>
									<Avatar className='w-8 h-8'>
										<AvatarImage
											src={
												(user?.publicMetadata?.imageUrl as string) ||
												user?.imageUrl
											}
										/>
										<AvatarFallback>
											<div className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-black to-indigo-700' />
										</AvatarFallback>
									</Avatar>
									<span className='ml-2 text-md'>{user?.username}</span>
								</div>
								<span className='text-sm font-thin'>
									{formatInTimeZone(
										new Date(
											formatWithOffset(event?.date as unknown as Date, -3),
										),
										'America/Sao_Paulo',
										"hh:mm aaaaa'm'",
									)}
								</span>
							</div>
							<Separator className='my-1' />
							<div className='flex flex-col'>
								<div className='flex flex-row items-center justify-between flex-1 pr-2'>
									<span className='text-lg font-semibold'>{event?.title}</span>
									{event?.tag && <Badge>{event?.tag}</Badge>}
								</div>
								{event?.description && (
									<span className='font-thin text-md'>
										{event?.description}
									</span>
								)}
								<span className='mt-2 text-xs font-thin'>
									Ativo por {event?.duration} minutos
								</span>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<span>Ver detalhes</span>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className='text-left'>
					<DrawerTitle>Edit profile</DrawerTitle>
					<DrawerDescription>
						Make changes to your profile here. Click save when you're done.
					</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter className='pt-2'>
					<DrawerClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
