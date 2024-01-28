import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'

const Checked = () => (
	<div className='flex items-center justify-center border-2 rounded-full w-7 h-7 bg-emerald-500'>
		<Check className='w-5 h-5 text-white' />
	</div>
)

const Empty = () => (
	<div className='flex items-center justify-center border-2 rounded-full w-7 h-7' />
)

export function Streaks() {
	return (
		<Card className='flex flex-row flex-1 p-4'>
			<div className='flex flex-col items-start flex-1 w-1/2 gap-2'>
				<div className='flex flex-col w-full'>
					<span className='font-semibold text-md'>Sequência de estudos</span>
					<span className='text-sm text-gray-500'>
						Seus streaks de dias estudados essa semana.
					</span>
				</div>
				<Card className='flex flex-row gap-2 p-1'>
					<div className='flex flex-col items-center justify-center gap-2 p-2'>
						<span className='text-sm font-light text-gray-500'>Seg</span>
						<Checked />
					</div>
					<div className='flex flex-col items-center justify-center gap-2 p-2'>
						<span className='text-sm font-light text-gray-500'>Ter</span>
						<Empty />
					</div>
					<div className='flex flex-col items-center justify-center gap-2 p-2'>
						<span className='text-sm font-light text-gray-500'>Qua</span>
						<Empty />
					</div>
					<div className='flex flex-col items-center justify-center gap-2 p-2'>
						<span className='text-sm font-light text-gray-500'>Qui</span>
						<Empty />
					</div>
					<div className='flex flex-col items-center justify-center gap-2 p-2'>
						<span className='text-sm font-light text-gray-500'>Sex</span>
						<Empty />
					</div>
					<div className='flex flex-col items-center justify-center gap-2 p-2'>
						<span className='text-sm font-light text-gray-500'>Sab</span>
						<Empty />
					</div>
					<div className='flex flex-col items-center justify-center gap-2 p-2'>
						<span className='text-sm font-light text-gray-500'>Dom</span>
						<Empty />
					</div>
				</Card>
				<div className='flex flex-col'>
					<span className='text-sm font-light text-gray-500'>
						Estude todos os dias para acumular seus streaks!
					</span>
				</div>
			</div>
			<div className='flex flex-col items-center justify-center w-1/2'>
				<Card className='flex flex-col flex-1 w-full'>
					<h2 className='font-bold text-center text-orange-500 text-7xl'>0</h2>
				</Card>
			</div>
		</Card>
	)
}
