import { CardsMetric } from './metrics'
import { ActivityTable } from './recent-activity'

export function Charts() {
	return (
		<div className='flex flex-col flex-1 w-full p-6'>
			<h1 className='mb-4 text-2xl font-semibold'>Dashboard</h1>
			<div className='flex flex-row items-stretch w-full gap-4'>
				<CardsMetric />
				<div className='flex flex-col w-1/2 gap-2'>
					<span className='text-2xl font-semibold'>Atividade</span>
					<ActivityTable />
				</div>
			</div>
		</div>
	)
}
