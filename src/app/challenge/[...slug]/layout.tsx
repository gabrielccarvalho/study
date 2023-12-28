import { Sidebar } from '@/components/app/sidebar'
import { Nav } from '@/components/nav'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex flex-col flex-1 h-screen'>
			<Nav />
			<main className='flex-row flex-1 hidden md:flex'>
				<Sidebar />
				<div className='flex flex-col flex-1 w-full ml-20'>{children}</div>
			</main>
		</div>
	)
}
