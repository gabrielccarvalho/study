'use client'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useChallenge } from '@/context/challenge-context'
import { useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

const formSchema = z.object({
	title: z.string(),
	description: z.string(),
	duration: z.string(),
	challenge: z.string(),
	file: z.any(),
})

export function AddEventForm() {
	const [file, setFile] = useState<File | null>(null)
	const { challenges, addEvent } = useChallenge()
	const { user } = useUser()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (!file) return

		const formData = new FormData()
		formData.append('file', file)

		try {
			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			})

			const data = await response.json()

			const { title, description, duration, challenge } = values

			addEvent({
				title,
				description,
				duration: parseInt(duration),
				challenge,
				imageUrl: data.image,
			})
		} catch (error) {
			console.error(error)
		}

		toast('Estudo adicionado!', {
			description: `Seu estudo "${values.title}" com duração de ${values.duration} minutos foi adicionado!`,
			action: {
				label: 'Desfazer',
				onClick: () => console.log('Desfazer'),
			},
		})
	}

	useEffect(() => {
		if (Object.values(form.formState.errors).length > 0) {
			toast('Oops! Ocorreu um erro.', {
				description: 'Seu estudo não pode ser computado',
				action: {
					label: 'Tentar novamente',
					onClick: () => console.log('Tentar novamente'),
				},
			})
		}
	}, [form.formState.errors])

	const challengesInfo = challenges
		.filter((challenge) => challenge.members.includes(user?.id as string))
		.map((challenge) => {
			return {
				id: challenge.id,
				title: challenge.title,
			}
		})

	return (
		<Form {...form}>
			<form
				id='add-event-form'
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-2'
			>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome do estudo</FormLabel>
							<FormControl>
								<Input placeholder='estudo sobre ...' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descrição do estudo</FormLabel>
							<FormControl>
								<Input placeholder='estudei matemática ...' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='duration'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Duração do estudo</FormLabel>
							<FormControl>
								<Input placeholder='60' type='number' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='file'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Imagem</FormLabel>
							<FormControl>
								<Input
									type='file'
									accept='image/png, image/jpeg, image/jpg'
									{...field}
									onChange={(e) => {
										field.onChange(e)
										if (!e.target.files) return
										setFile(e.target.files[0])
									}}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='challenge'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Desafio</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Selecione um desafio' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{challengesInfo.map((challenge) => (
										<SelectItem key={challenge.id} value={challenge.id}>
											{challenge.title}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
