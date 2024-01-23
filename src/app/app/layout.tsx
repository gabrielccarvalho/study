import { AddButton } from '@/components/control/add-button'
import { Nav } from '@/components/navigation/nav'
import { Sidebar } from '@/components/navigation/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className='flex flex-col flex-1'>
				<Nav />
				<main className='flex flex-col-reverse flex-1 md:flex-row'>
					<Sidebar />
					<div className='flex flex-col flex-1 w-full mb-20 md:ml-20 md:mb-0'>
						{children}
						<AddButton />
					</div>
				</main>
			</div>
		</>
	)
}
