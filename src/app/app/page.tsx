import { Charts } from '@/components/dashboard/charts'
import { Card } from '@/components/ui/card'

export default function App() {
	return (
		<>
			<div className='absolute inset-0 z-40 mt-20 ml-20 backdrop-blur-sm' />
			<div className='fixed z-50 flex items-center justify-center w-full h-full'>
				<Card className='flex flex-col items-center max-w-lg gap-8 p-6 pb-12'>
					<h1 className='text-2xl font-bold uppercase'>em desenvolvimento</h1>
					<p className='font-medium text-center text-md'>
						Em breve você poderá acompanhar todas as suas estatísticas de
						estudo, com gráficos e tabelas detalhadas sobre seu progresso.
					</p>
				</Card>
			</div>
			<div>
				<div className='flex flex-col flex-1 w-full'>
					<Charts />
				</div>
			</div>
		</>
	)
}
