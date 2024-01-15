import { Separator } from '@/components/ui/separator'

export default function ChallengesLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className='flex flex-col flex-1 py-2'>
			<div className='flex flex-col gap-2 px-4'>
				<h1 className='text-2xl font-medium'>Desafios</h1>
				<p className='text-sm text-gray-500'>
					Aqui você pode ver todos os desafios que você está participando.
				</p>
			</div>
			<Separator className='my-4' />
			<div className='flex flex-row flex-wrap justify-center gap-8 px-8 md:justify-normal'>
				{children}
			</div>
		</div>
	)
}
