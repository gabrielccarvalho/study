import { AddButton } from '@/components/add-button'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
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
			<html lang='pt'>
				<body className={`${GeistSans.variable}`}>
					<ThemeProvider
						attribute='class'
						defaultTheme='dark'
						enableSystem
						disableTransitionOnChange
					>
						{children}
						<Analytics />
						<SpeedInsights />
						<AddButton />
						<Toaster />
					</ThemeProvider>
				</body>
			</html>
		</Providers>
	)
}
