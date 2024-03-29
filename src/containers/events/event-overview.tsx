'use client'

import { useUser } from '@clerk/nextjs'
import { formatDistance } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import ptBR from 'date-fns/locale/pt-BR'
import Image from 'next/image'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useClerkUsers } from '@/hooks/use-clerk-users'
import { useEvents } from '@/hooks/use-events'
import { addComment } from '@/utils/db-functions'
import { formatWithOffset } from '@/utils/format-timezone'
import { Event } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { LoadingSkeleton } from './loading'

const formSchema = z.object({
	content: z.string(),
})

export function EventOverview({ event }: { event: string }) {
	const { user } = useUser()
	const { events, isLoading } = useEvents()
	const { userList } = useClerkUsers()

	const queryClient = useQueryClient()

	const { mutateAsync: addCommentFn } = useMutation({
		mutationFn: addComment,
		onSuccess(data, variables) {
			queryClient.setQueryData(['events'], (prevEvents: Event[]) => {
				const updatedEvents = prevEvents.map((event) => {
					if (event.id === variables.eventId) {
						return {
							...event,
							comments: [...event.comments, data],
						}
					}

					return event
				})

				return updatedEvents
			})
		},
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: '',
		},
	})

	if (isLoading) {
		return <LoadingSkeleton />
	}

	const currentEvent = events?.find((evt) => evt.id === event)

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (values.content === '') {
			toast('Oops! Ocorreu um erro.', {
				description: 'Você precisa escrever algo para enviar o comentário.',
				action: {
					label: 'Tentar novamente',
					onClick: () => console.log('Tentar novamente'),
				},
			})

			return
		}

		if (!user) return

		await addCommentFn({
			eventId: event,
			content: values.content,
			user: {
				id: user.id,
				username: user.username as string,
				avatar: (user.publicMetadata.imageUrl as string) || user.imageUrl,
			},
		})

		form.reset()

		toast('Comentário enviado!', {
			description: 'Seu comentário foi enviado! 🎉',
			action: {
				label: 'Fechar',
				onClick: () => {},
			},
		})
	}

	const currentUser = userList?.find(
		(user) => user.id === currentEvent?.user.id,
	)

	const eventComments = currentEvent?.comments

	return (
		<main className='flex flex-col flex-1 w-full max-w-4xl p-2 mx-auto'>
			<div className='flex flex-col items-center w-3/4 max-w-md mx-auto mt-2 md:w-full'>
				<Image
					src={currentEvent?.image || '/event-placeholder.svg'}
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
										currentUser?.publicMetadata?.imageUrl ||
										currentEvent?.user.avatar
									}
								/>
								<AvatarFallback>
									<div className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-black to-indigo-700' />
								</AvatarFallback>
							</Avatar>
							<span className='ml-2 text-md'>{currentUser?.username}</span>
						</div>
						<span className='text-sm font-thin'>
							{currentEvent &&
								formatInTimeZone(
									new Date(formatWithOffset(currentEvent.date, 3)),
									'America/Sao_Paulo',
									"hh:mm aaaaa'm'",
								)}
						</span>
					</div>
					<Separator className='my-1' />
					<div className='flex flex-col'>
						<div className='flex flex-row items-center justify-between flex-1 pr-2'>
							<span className='text-lg font-semibold'>
								{currentEvent?.title}
							</span>
							{currentEvent?.tag && <Badge>{currentEvent?.tag}</Badge>}
						</div>
						{currentEvent?.description && (
							<span className='font-thin text-md'>
								{currentEvent?.description}
							</span>
						)}
						<span className='mt-2 text-xs font-thin'>
							Ativo por {currentEvent?.duration} minutos
						</span>
					</div>
				</div>
			</div>
			{eventComments &&
				eventComments.length > 0 &&
				eventComments.map((comment) => {
					const commentUser = userList?.find((user) => {
						return user.id === comment.user.id
					})
					return (
						<div
							key={comment.id}
							className='flex flex-row w-3/4 max-w-md gap-2 p-2 mx-auto mt-2 border rounded-md shadow-md md:w-full bg-muted border-muted-foreground/10'
						>
							<Avatar className='w-7 h-7'>
								<AvatarImage
									src={
										commentUser?.publicMetadata?.imageUrl || comment.user.avatar
									}
								/>
								<AvatarFallback>
									<div className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-black to-indigo-700' />
								</AvatarFallback>
							</Avatar>
							<div className='flex flex-col justify-between'>
								<span className='text-sm font-semibold'>
									{commentUser?.username}
								</span>
								<span className='text-sm font-light'>{comment.content}</span>
								<span className='mt-2 text-xs font-thin'>
									{formatDistance(new Date(comment.created_at), new Date(), {
										addSuffix: true,
										locale: ptBR,
									})}
								</span>
							</div>
						</div>
					)
				})}
			<div className='flex flex-row justify-center w-3/4 max-w-md gap-2 p-2 mx-auto mt-2 border rounded-md shadow-md md:w-full bg-muted border-muted-foreground/10'>
				<Avatar className='w-7 h-7'>
					<AvatarImage src={user?.publicMetadata.imageUrl as string} />
					<AvatarFallback>
						<div className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-black to-indigo-700' />
					</AvatarFallback>
				</Avatar>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex justify-between flex-1 gap-2'
					>
						<FormField
							control={form.control}
							name='content'
							render={({ field }) => (
								<FormItem className='flex flex-1'>
									<FormControl>
										<Input
											placeholder='adicione um comentario'
											{...field}
											className='border-muted-foreground/20'
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<Button type='submit'>Enviar</Button>
					</form>
				</Form>
			</div>
		</main>
	)
}
