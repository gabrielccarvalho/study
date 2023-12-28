import { Sidebar } from '@/components/app/sidebar'
import { ChallengeList } from '@/components/challenges/challenge-card-list'
import { Nav } from '@/components/nav'
import { Separator } from '@/components/ui/separator'

export default function Challenges() {
	return (
		<div className='flex flex-col flex-1 h-screen'>
			<Nav />
			<main className='flex-row flex-1 hidden md:flex'>
				<Sidebar />
				<div className='flex flex-col flex-1 py-2'>
					<div className='flex flex-col gap-2 px-4'>
						<h1 className='text-2xl font-bold'>Desafios</h1>
						<p className='text-sm text-gray-500'>
							Aqui você pode ver todos os desafios que você está participando.
						</p>
					</div>
					<Separator className='my-4' />
					<div className='flex flex-row flex-wrap justify-center gap-8 px-8 md:justify-normal'>
						<ChallengeList />
					</div>
				</div>
			</main>
		</div>
	)
}
