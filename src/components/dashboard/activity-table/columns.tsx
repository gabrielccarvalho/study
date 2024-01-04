'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { ChevronDown, ChevronUp } from 'lucide-react'
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
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
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
