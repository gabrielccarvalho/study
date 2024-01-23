import '@/styles/globals.css'

import type { Metadata } from 'next'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ClerkProvider } from '@clerk/nextjs'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistSans } from 'geist/font/sans'
import { Providers } from './providers'

export const metadata: Metadata = {
	title: 'Study',
	description: 'Acompanhe seus estudos de forma divertida!',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<Providers>
				<html
					lang='pt-BR'
					style={{ colorScheme: 'light' }}
					className={GeistSans.className}
				>
					<body>
						<ThemeProvider
							attribute='class'
							defaultTheme='light'
							disableTransitionOnChange
						>
							{children}
							<SpeedInsights />
							<Toaster />
						</ThemeProvider>
					</body>
				</html>
			</Providers>
		</ClerkProvider>
	)
}
