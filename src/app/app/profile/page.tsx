import { LoginConnections } from '@/components/app/login-connections'
import { Sidebar } from '@/components/app/sidebar'
import { Nav } from '@/components/nav'
import { Separator } from '@/components/ui/separator'
import { currentUser } from '@clerk/nextjs'
import { ProfileForm } from './profile-form'

export default async function Profile() {
	const user = await currentUser()

	if (!user) {
		throw new Error('Not authenticated')
	}

	const { firstName, lastName, username, imageUrl, id } = user

	return (
		<div className='flex flex-col flex-1 h-screen'>
			<Nav />
			<main className='flex-row flex-1 hidden md:flex'>
				<Sidebar />
				<div className='flex flex-col flex-1 py-2'>
					<div className='flex flex-col w-full gap-2 px-4'>
						<h1 className='text-2xl font-bold'>Perfil</h1>
						<p className='text-sm text-gray-500'>
							Aqui você pode editar seus dados pessoais.
						</p>
					</div>
					<Separator className='my-4' />
					<div className='flex flex-row flex-wrap justify-center gap-8 px-8 md:justify-normal'>
						<div className='flex flex-col flex-wrap justify-center flex-1 max-w-screen-md gap-8 px-8'>
							<ProfileForm
								user={{
									id,
									firstName,
									lastName,
									imageUrl,
									username,
								}}
							/>
						</div>
					</div>
					<div className='flex flex-col w-full gap-2 px-4 mt-8'>
						<h1 className='text-2xl font-bold'>Dispositivos conectados</h1>
						<p className='text-sm text-gray-500'>
							Aqui estão os dispositivos em que sua conta realizou login.
						</p>
					</div>
					<Separator className='my-4' />
					<div className='flex flex-row flex-wrap justify-center gap-8 px-8 md:justify-normal'>
						<LoginConnections />
					</div>
				</div>
			</main>
		</div>
	)
}
