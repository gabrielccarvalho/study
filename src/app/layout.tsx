import { AddButton } from '@/components/control/add-button'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ChallengeProvider } from '@/context/challenge-context'
import { UserProvider } from '@/context/users-context'
import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
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
		<ClerkProvider>
			<ChallengeProvider>
				<UserProvider>
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
									<AddButton />
									<Toaster />
								</ThemeProvider>
							</body>
						</html>
					</Providers>
				</UserProvider>
			</ChallengeProvider>
		</ClerkProvider>
	)
}
