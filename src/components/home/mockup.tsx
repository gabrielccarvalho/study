import { Separator } from '../ui/separator'

export function Mockup() {
	return (
		<div className='flex-col hidden object-cover mx-auto overflow-hidden shadow-lg md:flex bg-slate-800 aspect-video rounded-xl sm:w-full lg:order-last lg:aspect-square'>
			<div className='flex flex-row items-center justify-between p-4'>
				<div className='w-16 h-2 transition-all duration-1000 delay-200 bg-purple-500 rounded-md animate-pulse' />
				<div className='flex flex-row items-center gap-2'>
					<div className='w-12 h-2 bg-indigo-500 rounded-full' />
					<div className='w-6 h-6 bg-indigo-500 rounded-full' />
				</div>
			</div>
			<Separator className='bg-white/50' />
			<div className='flex flex-row flex-1 px-2 py-4'>
				<div className='flex flex-col items-center justify-between h-full'>
					<div className='flex flex-col items-center gap-4'>
						<div className='w-5 h-5 bg-purple-500 rounded-lg' />
						<div className='w-5 h-5 bg-purple-500 rounded-lg' />
						<div className='w-5 h-5 bg-purple-500 rounded-lg' />
						<div className='w-5 h-5 bg-purple-500 rounded-lg' />
						<div className='w-5 h-5 bg-purple-500 rounded-lg' />
					</div>
					<div className='w-5 h-5 mb-4 bg-purple-500 rounded-lg' />
				</div>
				<Separator orientation='vertical' className='h-full ml-2 bg-white/50' />
				<div className='flex flex-col flex-1 p-2'>
					<div className='w-16 h-2 bg-indigo-500 rounded-md' />
					<div className='flex items-end w-full h-48 max-w-full gap-2 px-4 mt-4 overflow-hidden border border-white rounded-lg'>
						<div className='w-4 h-20 bg-indigo-500 rounded-t-sm' />
						<div className='w-4 h-12 bg-indigo-500 rounded-t-sm' />
						<div className='w-4 h-10 bg-indigo-500 rounded-t-sm' />
						<div className='w-4 h-20 bg-indigo-500 rounded-t-sm' />
						<div className='w-4 h-24 bg-indigo-500 rounded-t-sm' />
						<div className='w-4 h-24 bg-indigo-500 rounded-t-sm' />
						<div className='w-4 h-32 bg-indigo-500 rounded-t-sm' />
						<div className='w-4 bg-indigo-500 rounded-t-sm h-44' />
						<div className='w-4 h-12 bg-indigo-500 rounded-t-sm' />
						<div className='w-4 h-32 bg-indigo-500 rounded-t-sm' />
						<div className='w-4 h-20 bg-indigo-500 rounded-t-sm' />
						<div className='w-4 h-12 bg-indigo-500 rounded-t-sm' />
						<div className='w-4 h-10 bg-indigo-500 rounded-t-sm' />
						<div className='w-4 h-20 bg-indigo-500 rounded-t-sm' />
						<div className='w-4 h-24 bg-indigo-500 rounded-t-sm' />
						<div className='w-4 h-24 bg-indigo-500 rounded-t-sm' />
						<div className='w-4 h-32 bg-indigo-500 rounded-t-sm' />
						<div className='w-4 bg-indigo-500 rounded-t-sm h-44' />
						<div className='w-4 h-12 bg-indigo-500 rounded-t-sm' />
						<div className='w-4 h-32 bg-indigo-500 rounded-t-sm' />
						<div className='w-4 h-6 bg-indigo-500 rounded-t-sm' />
					</div>
					<div className='w-16 h-2 mt-4 bg-indigo-500 rounded-lg' />
					<div className='w-32 h-2 mt-2 bg-indigo-500 rounded-lg' />
					<div className='flex flex-col w-full h-48 gap-2 px-1 py-2 mt-2 border border-white rounded-lg'>
						<div className='w-full h-3 bg-indigo-500 rounded-md' />
						<div className='w-full h-3 bg-indigo-700 rounded-md' />
						<div className='w-full h-3 bg-indigo-500 rounded-md' />
						<div className='w-full h-3 bg-indigo-700 rounded-md' />
						<div className='w-full h-3 bg-indigo-500 rounded-md' />
						<div className='w-full h-3 bg-indigo-700 rounded-md' />
						<div className='w-full h-3 bg-indigo-500 rounded-md' />
						<div className='w-full h-3 bg-indigo-700 rounded-md' />
						<div className='w-full h-3 bg-indigo-500 rounded-md' />
						<div className='w-full h-3 bg-indigo-700 rounded-md' />
					</div>
				</div>
			</div>
		</div>
	)
}
