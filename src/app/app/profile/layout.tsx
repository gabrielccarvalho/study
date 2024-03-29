import { LoginConnections } from '@/components/profile/login-connections'
import { Separator } from '@/components/ui/separator'

export default function ProfileLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className='flex flex-col flex-1 py-2'>
			<div className='flex flex-col w-full gap-2 px-4'>
				<h1 className='text-2xl font-medium'>Perfil</h1>
				<p className='text-sm text-gray-500'>
					Aqui você pode editar seus dados pessoais.
				</p>
			</div>
			<Separator className='my-4' />
			<div className='flex flex-row flex-wrap justify-center gap-8 px-8 md:justify-normal'>
				<div className='flex flex-col flex-wrap justify-center flex-1 max-w-screen-md gap-8 px-8'>
					{children}
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
	)
}
