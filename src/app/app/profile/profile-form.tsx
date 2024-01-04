'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

interface ProfileFormProps {
	user: {
		id: string
		firstName: string | null
		lastName: string | null
		imageUrl: string
		username: string | null
	}
}

const profileFormSchema = z.object({
	avatar: z.any(),
	firstName: z.string(),
	lastName: z.string(),
	username: z.string(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm({ user }: ProfileFormProps) {
	const [userImage, setUserImage] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		mode: 'onChange',
		defaultValues: {
			firstName: user.firstName ?? '',
			lastName: user.lastName ?? '',
			username: user.username ?? '',
		},
	})

	async function onSubmit(data: ProfileFormValues) {
		await fetch('/api/clerk/update-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: user.id,
				firstName: data.firstName,
				lastName: data.lastName,
				username: data.username,
				imageUrl: userImage,
			}),
		})

		toast('Perfil atualizado com sucesso!')
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<Card>
					<CardContent className='p-6'>
						<FormField
							control={form.control}
							name='avatar'
							render={({ field }) => (
								<div className='flex items-center gap-6'>
									<input
										type='file'
										className='sr-only'
										onChange={async (e) => {
											setIsLoading(true)
											if (!e.target.files) return
											const file = e.target.files[0]

											const formData = new FormData()
											formData.append('file', file)

											try {
												const response = await fetch('/api/upload', {
													method: 'POST',
													body: formData,
												})

												const data = await response.json()

												setUserImage(data.image)

												field.onChange()
												setIsLoading(false)
											} catch (error) {
												console.error(error)
											}
										}}
										disabled={isLoading}
										ref={field.ref}
										name={field.name}
										id={field.name}
									/>

									<label
										htmlFor={field.name}
										className='cursor-pointer hover:opacity-70'
									>
										<Image
											src={userImage || user.imageUrl}
											alt='user avatar'
											width={64}
											height={64}
											className='w-16 h-16 rounded-full bg-primary/10'
										/>
									</label>
									<div>
										<span className='text-lg font-medium'>Seu avatar</span>
										<p className='text-sm text-muted-foreground'>
											Clique no seu avatar para alterá-lo.
										</p>
									</div>
								</div>
							)}
						/>
					</CardContent>
				</Card>

				<div className='grid grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>First name</FormLabel>
								<FormControl>
									<Input placeholder='John' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='lastName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last name</FormLabel>
								<FormControl>
									<Input placeholder='Doe' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='grid grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Usuário</FormLabel>
								<FormControl>
									<Input placeholder='@johndoe' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type='submit'>Update</Button>
			</form>
		</Form>
	)
}
