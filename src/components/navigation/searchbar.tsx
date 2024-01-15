import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

export function SearchBar({ className }: { className?: string }) {
	return (
		<div className='relative flex items-center'>
			<Search className='absolute w-4 h-4 ml-2 text-muted-foreground' />
			<Input
				placeholder='Pesquisar'
				className={cn('pl-8 rounded-full bg-muted', className)}
			/>
		</div>
	)
}
