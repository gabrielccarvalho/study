'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useSession, useUser } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import { formatDistance } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export function LoginConnections() {
	const { user, isLoaded } = useUser()
	const { session: currentSession } = useSession()

	const {
		data = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['connections'],
		queryFn: async () => {
			return user?.getSessions()
		},
		enabled: isLoaded && !!user,
	})

	return (
		<div className='flex flex-1 max-w-screen-md'>
			<div className='flex flex-col w-full gap-4'>
				{isLoading && (
					<div className='space-y-4'>
						<Skeleton className='h-28' />
						<Skeleton className='h-28' />
						<Skeleton className='h-28' />
					</div>
				)}
				{data.map((session) => {
					const isCurrentSession = currentSession?.id === session.id

					return (
						<Card
							className='flex items-center justify-between p-6 h-28'
							key={session.id}
						>
							<div className='flex flex-col gap-1'>
								<span className='flex items-center gap-2'>
									{session.latestActivity.deviceType} (
									{session.latestActivity.browserName}){' '}
									{isCurrentSession && (
										<Badge variant='secondary'>Este aparelho</Badge>
									)}
								</span>
								<span className='text-sm text-muted-foreground'>
									Ativo{' '}
									{formatDistance(new Date(session.lastActiveAt), new Date(), {
										addSuffix: true,
										locale: ptBR,
									})}
								</span>
							</div>

							<Button
								variant='destructive'
								disabled={isCurrentSession}
								onClick={() => {
									session.revoke()
									refetch()
								}}
							>
								Revogar acesso
							</Button>
						</Card>
					)
				})}
			</div>
		</div>
	)
}
