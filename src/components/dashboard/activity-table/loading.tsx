import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { ChevronsUpDown, MoreHorizontal } from 'lucide-react'

export function Loading() {
	return (
		<div>
			<div className='flex items-center py-4'>
				<Input
					placeholder='Procurar um estudo específico...'
					disabled
					className='max-w-sm'
				/>
			</div>
			<div className='border rounded-md'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>
								<Checkbox />
							</TableHead>
							<TableHead>
								<span>
									Desafio
									<ChevronsUpDown className='inline-block w-3 h-3 ml-1' />
								</span>
							</TableHead>
							<TableHead>
								<span>
									Titulo
									<ChevronsUpDown className='inline-block w-3 h-3 ml-1' />
								</span>
							</TableHead>
							<TableHead>
								<span>
									Etiqueta
									<ChevronsUpDown className='inline-block w-3 h-3 ml-1' />
								</span>
							</TableHead>
							<TableHead>
								<span>
									Data
									<ChevronsUpDown className='inline-block w-3 h-3 ml-1' />
								</span>
							</TableHead>
							<TableHead>
								<span>
									Tempo
									<ChevronsUpDown className='inline-block w-3 h-3 ml-1' />
								</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{[...Array(5)].map((v, index) => (
							<TableRow key={index + v}>
								<TableCell>
									<Checkbox />
								</TableCell>
								<TableCell>
									<Skeleton className='w-full h-4' />
								</TableCell>
								<TableCell>
									<Skeleton className='w-full h-4' />
								</TableCell>
								<TableCell>
									<Skeleton className='w-full h-4' />
								</TableCell>
								<TableCell>
									<Skeleton className='w-full h-4' />
								</TableCell>
								<TableCell>
									<Skeleton className='w-full h-4' />
								</TableCell>
								<TableCell className='flex justify-end'>
									<Button variant='ghost'>
										<MoreHorizontal className='w-4 h-4' />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<div className='mt-2'>
				<Skeleton className='w-48 h-4' />
			</div>
		</div>
	)
}
