import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export function LoadingSkeleton() {
	return (
		<main className='flex flex-col flex-1 w-full max-w-4xl p-4 mx-auto'>
			<div className='flex flex-col items-center w-full max-w-md mx-auto mt-2'>
				<Skeleton className='w-[450px] h-[450px] shadow-md rounded-b-none' />
				<div className='flex flex-col w-full max-w-md px-4 py-2 bg-muted rounded-b-md'>
					<div className='flex flex-row items-center justify-between'>
						<div className='flex flex-row items-center'>
							<Skeleton className='w-8 h-8 rounded-full' />
							<Skeleton className='w-12 h-3 my-1 ml-2' />
						</div>
						<Skeleton className='w-8 h-2' />
					</div>
					<Separator className='my-1' />
					<div className='flex flex-col'>
						<Skeleton className='w-32 h-3 my-1' />
						<Skeleton className='w-24 h-2' />
						<Skeleton className='w-24 h-2' />
					</div>
				</div>
			</div>
			<div className='flex flex-row items-center w-full max-w-md gap-2 p-2 mx-auto mt-2 rounded-md shadow-md bg-muted'>
				<Skeleton className='w-8 h-8 rounded-full' />
				<div className='flex justify-between flex-1 gap-2'>
					<div className='flex flex-col flex-1 gap-1'>
						<Skeleton className='w-16 h-4 mb-2' />
						<Skeleton className='w-1/2 h-3' />
						<Skeleton className='w-1/3 h-3' />
						<Skeleton className='w-8 h-2 mt-3' />
					</div>
				</div>
			</div>
			<div className='flex flex-row items-center w-full max-w-md gap-2 p-2 mx-auto mt-2 rounded-md shadow-md bg-muted'>
				<Skeleton className='w-8 h-8 rounded-full' />
				<div className='flex justify-between flex-1 gap-2'>
					<div className='flex flex-1'>
						<Input placeholder='adicione um comentario' />
					</div>

					<Button type='submit'>Enviar</Button>
				</div>
			</div>
		</main>
	)
}
