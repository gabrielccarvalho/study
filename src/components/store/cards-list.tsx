'use client'

import { useEffect, useState } from 'react'
import { CardPreview } from './card-preview'

interface Product {
	id: string
	name: string
	images: string[]
	description: string
}

export function CardsList() {
	const [products, setProducts] = useState<Product[]>([])

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch('/api/stripe/fetch-products').then((res) =>
				res.json(),
			)

			setProducts(response.products)
		}

		fetchProducts()
	}, [])

	return (
		<>
			{products.map((product) => {
				return (
					<CardPreview
						title={product.name}
						cardAmount={20}
						imageUrl={product.images[0]}
						price={4.99}
						description={product.description}
						redirect={'https://buy.stripe.com/bIY9Ed0xC0Sy05W144'}
					/>
				)
			})}
		</>
	)
}
