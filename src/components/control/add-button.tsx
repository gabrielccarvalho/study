'use client'

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CornerDownRight, PlusCircleIcon, PlusIcon } from 'lucide-react'

import { AddChallengeForm } from '@/components/control/add-challenge-form'
import { AddEventForm } from '@/components/control/add-event-form'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useChallenges } from '@/hooks/use-challenges'
import { joinChallenge } from '@/utils/db-functions'
import { Challenge } from '@/utils/types'
import { useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
	id: z.string(),
})

export function AddButton() {
	const queryClient = useQueryClient()
	const { user } = useUser()
	const { challenges } = useChallenges()

	const { mutateAsync: joinChallengeFn } = useMutation({
		mutationFn: joinChallenge,
		onSuccess(data) {
			queryClient.setQueryData(
				['challenges'],
				(prevChallenges: Challenge[]) => {
					return [...prevChallenges, ...data]
				},
			)
		},
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			if (!user) return
			await joinChallengeFn({ challengeId: values.id, userId: user.id })
		} catch (err) {
			console.error(err)
		}

		const challenge = challenges?.find(
			(challenge) => challenge.id === values.id,
		)

		toast('Sucesso!', {
			description: `Você entrou no desafio ${challenge?.title} 🎉`,
			action: {
				label: 'Desfazer',
				onClick: () => console.log('Desfazer'),
			},
		})
	}

	useEffect(() => {
		if (Object.values(form.formState.errors).length > 0) {
			toast('Falha ao entrar no desafio! 🙁', {
				description:
					'Parece que você não digitou o código do desafio corretamente.',
				action: {
					label: 'Desfazer',
					onClick: () => console.log('Desfazer'),
				},
			})

			form.reset()
		}
	}, [form, form.formState.errors])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='fixed z-50 flex items-center justify-center w-10 h-10 rounded-full md:w-12 md:h-12 right-6 bottom-4 md:right-10 md:bottom-10 bg-primary hover:cursor-pointer hover:bg-primary/80'>
					<PlusIcon className='w-4 h-4 md:w-6 md:h-6 text-primary-foreground' />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='flex flex-col items-start px-4 mr-20 -mb-4'>
				<DropdownMenuLabel asChild>
					<div className='flex items-center'>
						<span className='font-semibold text-md'>Adicionar</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Dialog>
						<DialogTrigger asChild>
							<div className='flex flex-row items-center cursor-pointer hover:text-primary'>
								<PlusCircleIcon className='w-4 h-4 mr-1 text-primary' />
								<span className='text-sm'>Estudo</span>
							</div>
						</DialogTrigger>
						<DialogContent className='sm:max-w-[425px]'>
							<DialogHeader>
								<DialogTitle>Adicionar um evento</DialogTitle>
								<DialogDescription>
									Adicione uma sessão de estudos a um desafio! Clique em Salvar
									quando tiver terminado.
								</DialogDescription>
								<AddEventForm />
								<DialogFooter className='sm:justify-center'>
									<DialogClose asChild>
										<Button
											type='submit'
											form='add-event-form'
											className='flex-1 mt-4'
										>
											Adicionar
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogHeader>
						</DialogContent>
					</Dialog>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Dialog>
						<DialogTrigger asChild>
							<div className='flex flex-row items-center cursor-pointer hover:text-primary'>
								<PlusCircleIcon className='w-4 h-4 mr-1 text-primary' />
								<span className='text-sm'>Desafio</span>
							</div>
						</DialogTrigger>
						<DialogContent className='sm:max-w-[425px]'>
							<DialogHeader>
								<DialogTitle>Adicionar um desafio</DialogTitle>
								<DialogDescription>
									Adicione um novo desafio e chame seus amigos! Clique em Salvar
									quando tiver terminado.
								</DialogDescription>
								<AddChallengeForm />
								<DialogFooter className='sm:justify-center'>
									<DialogClose asChild>
										<Button
											type='submit'
											form='add-challenge-form'
											className='flex-1 mt-4'
										>
											Adicionar
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogHeader>
						</DialogContent>
					</Dialog>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuLabel asChild>
					<div className='flex items-center'>
						<span className='font-semibold text-md'>Entrar</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Dialog>
						<DialogTrigger asChild>
							<div className='flex flex-row items-start cursor-pointer hover:text-primary'>
								<CornerDownRight className='w-4 h-4 mr-1 text-primary' />
								<span className='text-sm'>Desafio</span>
							</div>
						</DialogTrigger>
						<DialogContent className='sm:max-w-[425px]'>
							<DialogHeader>
								<DialogTitle>Se juntar a um desafio</DialogTitle>
								<DialogDescription>
									Se junte a um desafio colocando o código dele abaixo! Clique
									em Salvar quando tiver terminado.
								</DialogDescription>
								<Form {...form}>
									<form
										id='join-event-form'
										onSubmit={form.handleSubmit(onSubmit)}
									>
										<FormField
											control={form.control}
											name='id'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Cole o código do desafio aqui!</FormLabel>
													<FormControl>
														<Input placeholder='id do desafio' {...field} />
													</FormControl>
												</FormItem>
											)}
										/>
									</form>
								</Form>
								<DialogFooter className='sm:justify-center'>
									<DialogClose asChild>
										<Button
											type='submit'
											form='join-event-form'
											className='flex-1 mt-4'
										>
											Entrar
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogHeader>
						</DialogContent>
					</Dialog>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
