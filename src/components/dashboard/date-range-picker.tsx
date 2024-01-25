'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { subDays } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import * as React from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { ptBR } from 'date-fns/locale'

type Props = {
	className?: React.HTMLAttributes<HTMLDivElement>
	updateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}

export function CalendarDateRangePicker({ className, updateRange }: Props) {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: subDays(new Date(), 6),
		to: new Date(),
	})

	return (
		<div className={cn('grid gap-2', className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id='date'
						variant={'outline'}
						className={cn(
							'w-[260px] justify-start text-left font-normal',
							!date && 'text-muted-foreground',
						)}
					>
						<CalendarIcon className='w-4 h-4 mr-2' />
						{date?.from ? (
							date.to ? (
								<>
									{formatInTimeZone(
										date.from,
										'America/Sao_Paulo',
										'LLL dd, y',
										{
											locale: ptBR,
										},
									)}{' '}
									-{' '}
									{formatInTimeZone(date.to, 'America/Sao_Paulo', 'LLL dd, y', {
										locale: ptBR,
									})}
								</>
							) : (
								formatInTimeZone(date.from, 'America/Sao_Paulo', 'LLL dd, y', {
									locale: ptBR,
								})
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-auto p-0' align='end'>
					<Calendar
						initialFocus
						mode='range'
						locale={ptBR}
						defaultMonth={date?.from}
						selected={date}
						onSelect={(item) => {
							setDate(item)
							updateRange(item)
						}}
						numberOfMonths={2}
						disabled={{
							after: new Date(),
							before: new Date(2024, 0, 1),
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
