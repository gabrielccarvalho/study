import { Skeleton } from '@/components/ui/skeleton'

export function LoadingItem() {
	return (
		<div className='flex flex-col w-full max-w-lg gap-2 mx-auto my-2'>
			<Skeleton className='w-20 h-5' />
			<div className='flex flex-col items-center justify-between w-full max-w-lg px-4 py-1 mx-auto rounded-md shadow-sm bg-muted'>
				<div className='flex flex-row items-center justify-between w-full p-1'>
					<div className='flex flex-row gap-2'>
						<Skeleton className='w-12 h-12 rounded-full' />
						<div className='flex flex-col justify-around'>
							<Skeleton className='w-16 h-4' />
							<Skeleton className='w-32 h-3' />
						</div>
					</div>
					<div className='flex flex-row self-end'>
						<Skeleton className='w-8 h-4' />
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center justify-between w-full max-w-lg px-4 py-1 mx-auto rounded-md shadow-sm bg-muted'>
				<div className='flex flex-row items-center justify-between w-full p-1'>
					<div className='flex flex-row gap-2'>
						<Skeleton className='w-12 h-12 rounded-full' />
						<div className='flex flex-col justify-around'>
							<Skeleton className='w-16 h-4' />
							<Skeleton className='w-32 h-3' />
						</div>
					</div>
					<div className='flex flex-row self-end'>
						<Skeleton className='w-8 h-4' />
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center justify-between w-full max-w-lg px-4 py-1 mx-auto rounded-md shadow-sm bg-muted'>
				<div className='flex flex-row items-center justify-between w-full p-1'>
					<div className='flex flex-row gap-2'>
						<Skeleton className='w-12 h-12 rounded-full' />
						<div className='flex flex-col justify-around'>
							<Skeleton className='w-16 h-4' />
							<Skeleton className='w-32 h-3' />
						</div>
					</div>
					<div className='flex flex-row self-end'>
						<Skeleton className='w-8 h-4' />
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center justify-between w-full max-w-lg px-4 py-1 mx-auto rounded-md shadow-sm bg-muted'>
				<div className='flex flex-row items-center justify-between w-full p-1'>
					<div className='flex flex-row gap-2'>
						<Skeleton className='w-12 h-12 rounded-full' />
						<div className='flex flex-col justify-around'>
							<Skeleton className='w-16 h-4' />
							<Skeleton className='w-32 h-3' />
						</div>
					</div>
					<div className='flex flex-row self-end'>
						<Skeleton className='w-8 h-4' />
					</div>
				</div>
			</div>
		</div>
	)
}

export function LoadingSkeleton() {
	return (
		<main className='flex flex-col flex-1 p-4'>
			<LoadingSkeleton />
			<LoadingSkeleton />
			<LoadingSkeleton />
			<LoadingSkeleton />
			<LoadingSkeleton />
		</main>
	)
}
