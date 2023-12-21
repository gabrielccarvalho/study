import { ChallengeList } from '@/components/challenges/challenge-card-list'
import { Nav } from '@/components/nav'
import { Separator } from '@/components/ui/separator'
import { UserCard } from '@/components/user-card'

export default function Home() {
	return (
		<div className='flex flex-col flex-1 h-screen'>
			<Nav />
			<main className='flex flex-col flex-1 gap-2 md:flex-row'>
				<UserCard />

				<div className='flex flex-col flex-1 px-4 py-2'>
					<h2 className='py-2 text-2xl font-bold'>Desafios</h2>
					<Separator />

					<div className='flex flex-row flex-wrap justify-center gap-8 px-4 py-4 md:justify-normal'>
						<ChallengeList />
					</div>
				</div>
			</main>
		</div>
	)
}
