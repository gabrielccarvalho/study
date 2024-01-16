'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useSignIn, useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
	username: z.string(),
	password: z.string(),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { isLoaded, signIn, setActive } = useSignIn()
	const { isSignedIn } = useUser()
	const router = useRouter()

	useEffect(() => {
		if (isSignedIn) {
			router.push('/app')
		}
	}, [isSignedIn, router])

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true)

		if (!isLoaded) {
			return
		}

		try {
			const result = await signIn.create({
				identifier: values.username,
				password: values.password,
			})

			if (result.status === 'complete') {
				await setActive({ session: result.createdSessionId })
				router.push('/app')
			} else {
				console.error(result)
			}
		} catch (error) {
			console.log(error)
		}

		setIsLoading(false)
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<Form {...form}>
				<form id='login-form' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='grid gap-4'>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome de Usuário</FormLabel>
									<FormControl>
										<Input placeholder='johndoe' type='text' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input placeholder='*********' type='password' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<Button disabled={isLoading} type='submit' form='login-form'>
							{isLoading && (
								<Icons.spinner className='w-4 h-4 mr-2 animate-spin' />
							)}
							Entrar
						</Button>
					</div>
				</form>
			</Form>
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='px-2 bg-background text-muted-foreground'>
						ou continuar com
					</span>
				</div>
			</div>
			<Button variant='outline' type='button' disabled={isLoading}>
				{isLoading ? (
					<Icons.spinner className='w-4 h-4 mr-2 animate-spin' />
				) : (
					<Icons.google className='w-4 h-4 mr-2' />
				)}{' '}
				Google
			</Button>
		</div>
	)
}
