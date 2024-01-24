'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EventModal } from '@/containers/events/event-modal'
import { useChallenge } from '@/context/challenge-context'
import { ColumnDef } from '@tanstack/react-table'
import { Ban, MoreHorizontal } from 'lucide-react'
import { DeleteConfirmation } from '../delete-confirmation'
import { DataTableColumnHeader } from './header'

export type RecentActivity = {
	challenge: string
	title: string
	date: string
	duration: number
	id: string
}

export const columns: ColumnDef<RecentActivity>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
				className='rounded-none'
				style={{ borderRadius: '0.3rem' }}
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
				className='rounded-none'
				style={{ borderRadius: '0.3rem' }}
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'challenge',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Desafio' />
		),
	},
	{
		accessorKey: 'title',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Título' />
		),
	},
	{
		accessorKey: 'tags',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Etiquetas' />
		),
		cell: ({ row }) => {
			const tag: string = row.getValue('tags')

			if (!tag) {
				return ''
			}

			return <Badge>{tag}</Badge>
		},
	},
	{
		accessorKey: 'date',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Data' />
		),
	},
	{
		accessorKey: 'duration',
		header: ({ column }) => (
			<div>
				<DataTableColumnHeader column={column} title='Tempo' />
			</div>
		),
		cell: ({ row }) => {
			const duration: string = row.getValue('duration')

			return <div>{duration} min</div>
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const { deleteEvent } = useChallenge()
			const activity = row.original

			return (
				<div className='flex justify-end'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className='w-8 h-8 p-0'>
								<span className='sr-only'>Abrir menu</span>
								<MoreHorizontal className='w-4 h-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>Ações</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => navigator.clipboard.writeText(activity.title)}
							>
								Copiar título
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={(e) => e.preventDefault()}>
								<EventModal id={activity.id} />
							</DropdownMenuItem>
							<DropdownMenuItem disabled>Editar informações</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className='text-red-500'
								onClick={(e) => e.preventDefault()}
							>
								<DeleteConfirmation id={activity.id} />
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)
		},
	},
]
