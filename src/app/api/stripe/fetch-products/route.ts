import { NextResponse } from 'next/server'
import { Stripe } from 'stripe'

export async function GET() {
	try {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
			apiVersion: '2023-10-16',
		})

		const products = await stripe.products.list()

		return NextResponse.json({ success: true, products: products.data })
	} catch (error) {
		return NextResponse.json({ error: 'Error fetching challenges' })
	}
}

export const revalidate = 60 * 60 * 24
