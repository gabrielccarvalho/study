import { AddButton } from '@/components/add-button'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { ChallengeProvider } from '@/context/challenge-context'
import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { Inter, Nunito_Sans, Roboto } from 'next/font/google'
import { Providers } from './providers'

const nunito = Nunito_Sans({
	weight: ['200', '400', '600', '700', '900'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	variable: '--font-nunito-sans',
})

const inter = Inter({
	weight: ['200', '400', '600', '700', '900'],
	style: ['normal'],
	subsets: ['latin'],
	variable: '--font-inter',
})

const roboto = Roboto({
	weight: ['400'],
	style: ['normal'],
	subsets: ['latin'],
	variable: '--font-roboto',
})

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
			<ClerkProvider
				appearance={{
					baseTheme: dark,
				}}
			>
				<ChallengeProvider>
					<html lang='en'>
						<body
							className={`${inter.variable} ${nunito.variable} ${roboto.variable} ${GeistSans.variable}`}
						>
							<ThemeProvider
								attribute='class'
								defaultTheme='dark'
								enableSystem
								disableTransitionOnChange
							>
								{children}
								<AddButton />
								<Toaster />
							</ThemeProvider>
						</body>
					</html>
				</ChallengeProvider>
			</ClerkProvider>
		</Providers>
	)
}
