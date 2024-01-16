'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useSignUp, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import { Label } from '../ui/label'

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const { isSignedIn } = useUser()
	const [code, setCode] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [emailAddress, setEmailAddress] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [pendingVerification, setPendingVerification] = useState<boolean>(false)
	const { isLoaded, signUp, setActive } = useSignUp()
	const router = useRouter()

	useEffect(() => {
		if (isSignedIn) {
			router.push('/app')
		}
	}, [isSignedIn, router])

	const handleSubmit = async (e: React.FormEvent) => {
		setIsLoading(true)
		e.preventDefault()
		if (!isLoaded) {
			return
		}

		try {
			await signUp.create({
				emailAddress,
				password,
				username,
				firstName,
				lastName,
			})

			await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

			setPendingVerification(true)
		} catch (err) {
			console.log(JSON.stringify(err, null, 2))
		}
		setIsLoading(false)
	}

	const onPressVerify = async (e: React.MouseEvent) => {
		e.preventDefault()

		if (!isLoaded) {
			return
		}

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code,
			})

			if (completeSignUp.status !== 'complete') {
				console.log(JSON.stringify(completeSignUp, null, 2))
			}
			if (completeSignUp.status === 'complete') {
				await setActive({ session: completeSignUp.createdSessionId })
				router.push('/')
			}
		} catch (err) {
			console.error(JSON.stringify(err, null, 2))
		}
	}

	return (
		<>
			{!pendingVerification && (
				<div className={cn('grid gap-6', className)} {...props}>
					<form id='register-form'>
						<div className='grid gap-4'>
							<Label>Email</Label>
							<Input
								placeholder='johndoe@example.com'
								type='email'
								onChange={(e) => setEmailAddress(e.target.value)}
							/>
							<Label>Nome de Usuário</Label>
							<Input
								placeholder='johndoe'
								type='text'
								onChange={(e) => setUsername(e.target.value)}
							/>
							<div className='flex gap-2'>
								<div className='flex flex-col gap-2'>
									<Label>Primeiro Nome</Label>
									<Input
										placeholder='johndoe'
										type='text'
										onChange={(e) => setFirstName(e.target.value)}
									/>
								</div>
								<div className='flex flex-col gap-2'>
									<Label>Último Nome</Label>
									<Input
										placeholder='johndoe'
										type='text'
										onChange={(e) => setLastName(e.target.value)}
									/>
								</div>
							</div>
							<Label>Senha</Label>
							<Input
								placeholder='********'
								type='password'
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Button onClick={handleSubmit}>
								{isLoading && (
									<Icons.spinner className='w-4 h-4 mr-2 animate-spin' />
								)}
								Registrar
							</Button>
						</div>
					</form>
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
					<Button variant='outline' type='button'>
						{isLoading ? (
							<Icons.spinner className='w-4 h-4 mr-2 animate-spin' />
						) : (
							<Icons.google className='w-4 h-4 mr-2' />
						)}{' '}
						Google
					</Button>
				</div>
			)}
			{pendingVerification && (
				<div>
					<form>
						<div className='flex flex-col items-center flex-1 gap-4'>
							<OtpInput
								value={code}
								onChange={setCode}
								numInputs={6}
								renderSeparator={<span className='mx-2'>•</span>}
								renderInput={(props) => (
									<Input
										ref={props.ref}
										value={props.value}
										onChange={props.onChange}
										onFocus={props.onFocus}
										onBlur={props.onBlur}
										onKeyDown={props.onKeyDown}
										onPaste={props.onPaste}
										onInput={props.onInput}
										type={props.type}
										inputMode={props.inputMode}
										className='w-12 h-12 text-xl font-bold text-center bg-transparent border rounded-md border-slate-300 dark:border-slate-500 focus:ring-0 focus:border-slate-300 dark:focus:border-slate-500'
									/>
								)}
							/>
							<Button onClick={onPressVerify}>Verificar Email</Button>
						</div>
					</form>
				</div>
			)}
		</>
	)
}
