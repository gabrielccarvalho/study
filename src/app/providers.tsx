'use client'

import { ReactNode, useState } from 'react'

import { ChallengeProvider } from '@/context/challenge-context'
import { UserProvider } from '@/context/users-context'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark,
			}}
		>
			<ChallengeProvider>
				<UserProvider>
					<QueryClientProvider client={queryClient}>
						{children}
					</QueryClientProvider>
				</UserProvider>
			</ChallengeProvider>
		</ClerkProvider>
	)
}
