'use client'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './header'

export type RecentActivity = {
	challenge: string
	title: string
	date: string
	duration: number
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
			<div className='flex justify-end'>
				<DataTableColumnHeader column={column} title='Tempo' />
			</div>
		),
		cell: ({ row }) => {
			const duration: string = row.getValue('duration')

			return <div className='font-medium text-right'>{duration} min</div>
		},
	},
]
