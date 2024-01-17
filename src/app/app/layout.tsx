import { Nav } from '@/components/navigation/nav'
import { Sidebar } from '@/components/navigation/sidebar'
import { ChallengeProvider } from '@/context/challenge-context'
import { UserProvider } from '@/context/users-context'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className='flex flex-col flex-1 h-screen'>
				<Nav />
				<main className='flex flex-col-reverse flex-1 md:flex-row'>
					<Sidebar />
					<div className='flex flex-col flex-1 w-full mb-20 md:ml-20 md:mb-0'>
						<ChallengeProvider>
							<UserProvider>{children}</UserProvider>
						</ChallengeProvider>
					</div>
				</main>
			</div>
		</>
	)
}
