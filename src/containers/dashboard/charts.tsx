import { ActivityDataTable } from '@/components/dashboard/activity-table/page'
import { CardsMetric } from '@/components/dashboard/metrics'

export function Charts() {
	return (
		<div>
			<div className='flex flex-col flex-1 w-full'>
				<div className='flex flex-col flex-1 w-full p-6'>
					<h1 className='mb-4 text-2xl font-semibold'>Dashboard</h1>
					<div className='flex flex-col items-stretch w-full gap-4'>
						<CardsMetric />
						<div className='flex-col flex-1 hidden gap-2 md:flex'>
							<span className='text-2xl font-semibold'>Atividade</span>
							<ActivityDataTable />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
