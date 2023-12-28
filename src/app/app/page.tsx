import { Charts } from '@/components/dashboard/charts'
import { Nav } from '@/components/nav'
import { Sidebar } from '@/components/sidebar'

export default function App() {
	return (
		<div className='flex flex-col flex-1 w-full'>
			<Charts />
		</div>
	)
}
