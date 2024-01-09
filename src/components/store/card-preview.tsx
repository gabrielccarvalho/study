import Image from 'next/image'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

type Props = {
	title: string
	price: number
	description: string
	imageUrl: string
	cardAmount: number
}

export function CardPreview({
	title,
	price,
	description,
	imageUrl,
	cardAmount,
}: Props) {
	function formatCurrency(
		amount: number,
		locale = 'pt-BR',
		currencyCode = 'BRL',
	): string {
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: currencyCode,
		}).format(amount)
	}

	return (
		<Card className='flex flex-col overflow-hidden transition-all duration-200 border rounded-sm shadow-md border-muted-foreground/10 w-80 dark:border-muted-foreground/40 hover:scale-105'>
			<div className='flex items-center justify-center overflow-hidden max-h-[300px] roundend-t-sm'>
				<Image
					src={imageUrl}
					alt='flashcard preview'
					width={320}
					height={320}
					className='rounded-t-sm'
				/>
			</div>
			<div className='flex flex-col p-4'>
				<div className='flex flex-row items-center justify-between'>
					<div className='flex flex-col'>
						<span className='text-lg font-semibold'>{title}</span>
						<span className='text-sm text-muted-foreground'>
							{cardAmount} cartões
						</span>
					</div>
					<span className='text-lg font-extrabold'>
						{formatCurrency(price)}
					</span>
				</div>
				<span className='my-4 text-sm text-muted-foreground'>
					{description}
				</span>
			</div>
			<div className='flex items-end flex-1 w-full px-2 pb-2'>
				<Button variant='default' className='w-full my-2 rounded-sm'>
					<span className='text-xs'>Adicionar ao Carrinho</span>
				</Button>
			</div>
		</Card>
	)
}
