'use client'

import { useUser } from '@clerk/nextjs'
import { format, formatDistance } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import Image from 'next/image'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useChallenge } from '@/context/challenge-context'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Skeleton } from '@/components/ui/skeleton'
import { useUsers } from '@/context/users-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Badge } from '../ui/badge'

const formSchema = z.object({
	content: z.string(),
})

function LoadingSkeleton() {
	return (
		<main className='flex flex-col flex-1 w-full max-w-4xl p-4 mx-auto'>
			<div className='flex flex-col items-center w-full max-w-md mx-auto mt-2'>
				<Skeleton className='w-[450px] h-[450px] shadow-md rounded-b-none' />
				<div className='flex flex-col w-full max-w-md px-4 py-2 bg-muted rounded-b-md'>
					<div className='flex flex-row items-center justify-between'>
						<div className='flex flex-row items-center'>
							<Skeleton className='w-8 h-8 rounded-full' />
							<Skeleton className='w-12 h-3 my-1 ml-2' />
						</div>
						<Skeleton className='w-8 h-2' />
					</div>
					<Separator className='my-1' />
					<div className='flex flex-col'>
						<Skeleton className='w-32 h-3 my-1' />
						<Skeleton className='w-24 h-2' />
						<Skeleton className='w-24 h-2' />
					</div>
				</div>
			</div>
			<div className='flex flex-row items-center w-full max-w-md gap-2 p-2 mx-auto mt-2 rounded-md shadow-md bg-muted'>
				<Skeleton className='w-8 h-8 rounded-full' />
				<div className='flex justify-between flex-1 gap-2'>
					<div className='flex flex-col flex-1 gap-1'>
						<Skeleton className='w-16 h-4 mb-2' />
						<Skeleton className='w-1/2 h-3' />
						<Skeleton className='w-1/3 h-3' />
						<Skeleton className='w-8 h-2 mt-3' />
					</div>
				</div>
			</div>
			<div className='flex flex-row items-center w-full max-w-md gap-2 p-2 mx-auto mt-2 rounded-md shadow-md bg-muted'>
				<Skeleton className='w-8 h-8 rounded-full' />
				<div className='flex justify-between flex-1 gap-2'>
					<div className='flex flex-1'>
						<Input placeholder='adicione um comentario' />
					</div>

					<Button type='submit'>Enviar</Button>
				</div>
			</div>
		</main>
	)
}

export function EventOverview({ id, event }: { id: string; event: string }) {
	const { challenges, addComment } = useChallenge()
	const { user } = useUser()
	const { userList } = useUsers()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: '',
		},
	})

	const challenge = challenges.find((challenge) => challenge?.id === id)

	if (!challenge || !user) {
		return <LoadingSkeleton />
	}

	const currentEvent = challenge.events.find(
		(evt: Record<string, unknown>) => evt.id === event,
	)

	if (!currentEvent) {
		redirect(`/challenge/${id}`)
	}

	function onSubmit(values: z.infer<typeof formSchema>) {
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

		addComment({
			challengeId: id,
			eventId: event,
			content: values.content,
		})

		form.reset()

		toast('Comentário enviado!', {
			description: 'Seu comentário foi enviado! 🎉',
			action: {
				label: 'Desfazer',
				onClick: () => console.log('Desfazer'),
			},
		})
	}

	const currentUser = userList.find((user) => user.id === currentEvent.user.id)

	return (
		<main className='flex flex-col flex-1 w-full max-w-4xl p-2 mx-auto'>
			<div className='flex flex-col items-center w-3/4 max-w-md mx-auto mt-2 md:w-full'>
				<Image
					src={currentEvent.image}
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
										currentEvent.user.avatar
									}
								/>
								<AvatarFallback>
									<div className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-black to-indigo-700' />
								</AvatarFallback>
							</Avatar>
							<span className='ml-2 text-md'>{currentUser?.username}</span>
						</div>
						<span className='text-sm font-thin'>
							{format(new Date(currentEvent.date), "hh:mm aaaaa'm'")}
						</span>
					</div>
					<Separator className='my-1' />
					<div className='flex flex-col'>
						<div className='flex flex-row items-center justify-between flex-1 pr-2'>
							<span className='text-lg font-semibold'>
								{currentEvent.title}
							</span>
							{currentEvent.tag && <Badge>{currentEvent.tag}</Badge>}
						</div>
						<span className='font-thin text-md'>
							{currentEvent.description}
						</span>
						<span className='mt-2 text-xs font-thin'>
							Ativo por {currentEvent.duration} minutos
						</span>
					</div>
				</div>
			</div>
			{currentEvent.comments?.map((comment) => {
				const commentUser = userList.find((user) => user.id === comment.user.id)
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
					<AvatarImage src={user.publicMetadata.imageUrl as string} />
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
