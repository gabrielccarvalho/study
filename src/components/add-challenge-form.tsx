'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useChallenge } from '@/context/challenge-context'
import { cn } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const formSchema = z.object({
	title: z.string(),
	description: z.string(),
	endDate: z.date(),
	file: z.any(),
})

export function AddChallengeForm() {
	const { user } = useUser()
	const [file, setFile] = useState<File | null>(null)
	const { addChallenge } = useChallenge()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (!file || !user) return

		const formData = new FormData()
		formData.append('file', file)

		try {
			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			})

			const data = await response.json()

			addChallenge({
				title: values.title,
				description: values.description,
				thumbnail: data.image,
				startDate: new Date(),
				endDate: new Date(values.endDate),
				events: [],
				members: [user.id],
			})
		} catch (error) {
			console.error(error)
		}

		toast('Desafio adicionado!', {
			description: `Seu desafio "${values.title}" foi adicionado! 🎉`,
			action: {
				label: 'Desfazer',
				onClick: () => console.log('Desfazer'),
			},
		})
	}

	useEffect(() => {
		if (Object.values(form.formState.errors).length > 0) {
			toast('Oops! Ocorreu um erro.', {
				description: 'Seu desafio não pode ser criado 🙁',
				action: {
					label: 'Tentar novamente',
					onClick: () => console.log('Desfazer'),
				},
			})
		}
	}, [form.formState.errors])

	return (
		<Form {...form}>
			<form
				id='add-challenge-form'
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-2'
			>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Título do desafio</FormLabel>
							<FormControl>
								<Input placeholder='nome do desafio' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descrição do desafio</FormLabel>
							<FormControl>
								<Input placeholder='descrição do desafio' {...field} />
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
					name='endDate'
					render={({ field }) => (
						<FormItem className='flex flex-col flex-1 gap-1 mt-2'>
							<FormLabel>Fim do desafio</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												'pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground',
											)}
										>
											{field.value ? (
												format(field.value, 'PPP', { locale: ptBR })
											) : (
												<span>Selecione uma data</span>
											)}
											<CalendarIcon className='w-4 h-4 ml-auto opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0' align='start'>
									<Calendar
										mode='single'
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) => date < new Date()}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
