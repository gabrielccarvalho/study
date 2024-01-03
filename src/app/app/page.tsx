import { Charts } from '@/components/dashboard/charts'
import { Card } from '@/components/ui/card'

export default function App() {
	return (
		<>
			<div>
				<div className='flex flex-col flex-1 w-full'>
					<Charts />
				</div>
			</div>
		</>
	)
}
