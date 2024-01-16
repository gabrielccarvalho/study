import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { UserAuthForm } from '@/components/login/user-auth-form'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
	title: 'Authentication',
	description: 'Authentication forms built using the components.',
}

export default function AuthenticationPage() {
	return (
		<>
			<div className='h-screen md:hidden'>
				<Image
					src='/examples/authentication-light.png'
					width={1280}
					height={843}
					alt='Authentication'
					className='block dark:hidden'
				/>
				<Image
					src='/examples/authentication-dark.png'
					width={1280}
					height={843}
					alt='Authentication'
					className='hidden dark:block'
				/>
			</div>
			<div className='container relative flex-col items-center justify-center hidden h-screen md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
				<Link
					href='/register'
					className={cn(
						buttonVariants({ variant: 'ghost' }),
						'absolute right-4 top-4 md:right-8 md:top-8',
					)}
				>
					Cadastro
				</Link>
				<div className='relative flex-col hidden h-full p-10 text-white bg-muted lg:flex dark:border-r'>
					<div className='absolute inset-0 bg-zinc-900' />
					<div className='relative z-20 flex items-center text-lg font-medium'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='w-6 h-6 mr-2'
						>
							<path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
						</svg>
						Study.app
					</div>
					<div className='relative z-20 mt-auto'>
						<blockquote className='space-y-2'>
							<p className='text-lg'>
								&ldquo;Esse aplicativo me ajudou infinitamente na formação de
								rotinas de estudo para alcançar meus objetivos.&rdquo;
							</p>
							<footer className='text-sm'>Gabriel Campos</footer>
						</blockquote>
					</div>
				</div>
				<div className='lg:p-8'>
					<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
						<div className='flex flex-col space-y-2 text-center'>
							<h1 className='text-2xl font-semibold tracking-tight'>
								Entrar na plataforma
							</h1>
							<p className='text-sm text-muted-foreground'>
								Insira seu email e senha para entrar na sua conta
							</p>
						</div>
						<UserAuthForm />
					</div>
				</div>
			</div>
		</>
	)
}
