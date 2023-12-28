import { DailyGoal } from '../app/daily-goal'
import { CardsMetric } from './metrics'

export function Charts() {
	return (
		<div className='flex flex-col flex-1 w-full p-6 max-w-7xl'>
			<h1 className='mb-4 text-2xl font-semibold'>Dashboard</h1>
			<div className='flex flex-row justify-between w-full max-w-screen-2xl'>
				<CardsMetric />
			</div>
		</div>
	)
}
