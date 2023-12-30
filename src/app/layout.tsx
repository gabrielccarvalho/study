import { AddButton } from '@/components/add-button'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
	title: 'study',
	description: 'Study with your friends!',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<Providers>
			<html lang='en'>
				<body className={`${GeistSans.variable}`}>
					<ThemeProvider
						attribute='class'
						defaultTheme='dark'
						enableSystem
						disableTransitionOnChange
					>
						{children}
						<Analytics />
						<AddButton />
						<Toaster />
					</ThemeProvider>
				</body>
			</html>
		</Providers>
	)
}
