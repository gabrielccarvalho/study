import { Sidebar } from '@/components/app/sidebar'
import { Charts } from '@/components/dashboard/charts'
import { Nav } from '@/components/nav'

export default function App() {
	return (
		<div className='flex flex-col flex-1 h-screen'>
			<Nav />
			<main className='flex-row flex-1 hidden md:flex'>
				<Sidebar />
				<div className='flex flex-col flex-1 w-full'>
					<Charts />
				</div>
			</main>
		</div>
	)
}
