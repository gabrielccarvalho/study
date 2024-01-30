import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export function LoadingSkeleton() {
	return (
		<main className='flex flex-col items-center'>
			<div className='flex flex-col items-center justify-center w-full overflow-hidden max-h-96'>
				<Skeleton className='w-full mb-2 rounded-none aspect-[16/9]' />
			</div>
			<div className='flex flex-row items-center justify-around w-full max-w-md py-4 mx-auto'>
				<div className='flex flex-row items-center gap-2'>
					<Skeleton className='w-10 h-10 rounded-full' />
					<div className='flex flex-col justify-between'>
						<Skeleton className='w-12 h-3 my-1' />
						<Skeleton className='w-8 h-2' />
					</div>
				</div>

				<div className='flex flex-row items-center gap-2'>
					<Skeleton className='w-10 h-10 rounded-full' />
					<div className='flex flex-col justify-between'>
						<Skeleton className='w-12 h-3 my-1' />
						<Skeleton className='w-8 h-2' />
					</div>
				</div>

				<div className='flex flex-row items-center gap-2'>
					<Skeleton className='w-10 h-10 rounded-full' />
					<div className='flex flex-col justify-between'>
						<Skeleton className='w-12 h-3 my-1' />
						<Skeleton className='w-8 h-2' />
					</div>
				</div>
			</div>
			<Separator />
		</main>
	)
}
