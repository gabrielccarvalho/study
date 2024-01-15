import { formatCurrency } from '@/utils/format-currency'
import { CheckIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

type Props = {
	title: string
	description: string
	price: number
	features: string[]
	notIncluded?: string[]
	cta: string
	redirect?: string
}

export function PricingCard({
	title,
	description,
	price,
	features,
	notIncluded,
	redirect,
	cta,
}: Props) {
	return (
		<div className='flex flex-col h-full p-6 space-y-4 border border-gray-500 rounded-2xl dark:border-gray-800'>
			<h2 className='text-2xl font-bold'>{title}</h2>
			<p className='text-gray-500 dark:text-gray-400'>{description}</p>
			<h3 className='text-3xl font-bold'>{formatCurrency(price)} /mês</h3>
			<ul className='grid flex-grow gap-2 py-4'>
				{features.map((feature) => (
					<li className='flex items-center justify-start'>
						<CheckIcon className='inline-block w-5 h-5 mr-2 text-emerald-500' />
						<span className='truncate'>{feature}</span>
					</li>
				))}
				{notIncluded?.map((notIncluded) => (
					<li className='flex items-center justify-start'>
						<XIcon className='inline-block w-5 h-5 mr-2 text-red-500' />
						<span className='truncate'>{notIncluded}</span>
					</li>
				))}
			</ul>
			{redirect ? (
				<Link href={redirect} target='_blank'>
					<Button className='w-full'>{cta}</Button>
				</Link>
			) : (
				<Button className='w-full'>{cta}</Button>
			)}
		</div>
	)
}
