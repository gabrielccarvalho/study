'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useChallenges } from '@/hooks/use-challenges'
import { useClerkUsers } from '@/hooks/use-clerk-users'
import { useEvents } from '@/hooks/use-events'
import { leaveChallenge } from '@/utils/db-functions'
import { Challenge } from '@/utils/types'
import { useUser } from '@clerk/nextjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { differenceInDays } from 'date-fns'
import { Calendar, UserRound } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

function LoadingSkeleton() {
	return (
		<main className='flex flex-col items-center'>
			<div className='flex flex-col items-center justify-center w-full overflow-hidden max-h-96'>
				<Skeleton className='w-full mb-2 rounded-none aspect-[16/9]' />
			</div>
			<div className='flex flex-row items-center justify-around w-full max-w-md py-4 mx-auto'>
				<div className='flex flex-row items-center gap-2'>
					<Skeleton className='w-10 h-10 rounded-full' />
					<div className='flex flex-col justify-between'>
						<Skeleton className='w-12 h-3 my-1' />
						<Skeleton className='w-8 h-2' />
					</div>
				</div>

				<div className='flex flex-row items-center gap-2'>
					<Skeleton className='w-10 h-10 rounded-full' />
					<div className='flex flex-col justify-between'>
						<Skeleton className='w-12 h-3 my-1' />
						<Skeleton className='w-8 h-2' />
					</div>
				</div>

				<div className='flex flex-row items-center gap-2'>
					<Skeleton className='w-10 h-10 rounded-full' />
					<div className='flex flex-col justify-between'>
						<Skeleton className='w-12 h-3 my-1' />
						<Skeleton className='w-8 h-2' />
					</div>
				</div>
			</div>
			<Separator />
		</main>
	)
}

export function ChallengeOverview({ id }: { id: string }) {
	const { user } = useUser()
	const { events } = useEvents()
	const { challenges } = useChallenges()
	const { userList } = useClerkUsers()

	const router = useRouter()
	const queryClient = useQueryClient()

	const { mutateAsync: leaveChallengeFn } = useMutation({
		mutationFn: leaveChallenge,
		onSuccess(_, variables) {
			queryClient.setQueryData(['challenges'], (data: Challenge[]) => {
				const challenges = data.filter(
					(challenge) => challenge.id !== variables.challengeId,
				)

				const updatedChallenge = data.find(
					(challenge) => challenge.id === variables.challengeId,
				)

				if (updatedChallenge) {
					updatedChallenge.members = updatedChallenge.members.filter(
						(member) => member !== user?.id,
					)
				}

				return [...challenges, updatedChallenge]
			})
		},
	})

	const challenge = challenges?.find((challenge) => challenge.id === id)

	const eventsData = events?.filter((event) => event.challenge_id === id)

	if (!eventsData || !user || !challenge) {
		return <LoadingSkeleton />
	}

	async function handleLeaveChallenge() {
		if (!user) return

		try {
			await leaveChallengeFn({
				challengeId: id,
				userId: user.id,
			})

			router.push('/app/challenges')
		} catch (err) {
			console.log(err)
		}
	}

	const leaderboard = eventsData.reduce(
		(
			acc: {
				duration: number
				user: {
					id: string
					username: string | null
					avatar: string
				}
			}[],
			event,
		) => {
			const existingUser = acc.find((item) => item.user.id === event.user.id)

			if (existingUser) {
				existingUser.duration += event.duration
			} else {
				acc.push({
					user: {
						id: event.user.id,
						username: event.user.username,
						avatar: event.user.avatar,
					},
					duration: event.duration,
				})
			}

			return acc
		},
		[],
	)

	const userChallengeData = leaderboard.find((item) => item.user.id === user.id)

	const userPoints = userChallengeData?.duration || 0

	const leaderChallengeData = leaderboard.find(
		(item) =>
			item.duration === Math.max(...leaderboard.map((item) => item.duration)),
	)

	const leaderPoints = leaderChallengeData?.duration || 0

	const currentLeader = userList?.find(
		(user) => user.id === leaderChallengeData?.user.id,
	)

	return (
		<main className='flex flex-col items-center'>
			<div className='flex flex-col items-center justify-center w-full overflow-hidden max-h-96'>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button className='absolute right-4 top-24'>
							<span>Sair</span>
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Tem certeza de que quer sair deste dessafio?
							</AlertDialogTitle>
							<AlertDialogDescription>
								Essa ação não pode ser desfeita. Caso realmente queira sair do
								desafio, clique em continuar.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancelar</AlertDialogCancel>
							<AlertDialogAction onClick={handleLeaveChallenge}>
								Continuar
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
				<Image
					src={challenge.thumbnail}
					alt='challenge image'
					width={1920}
					height={1080}
					quality={25}
				/>
			</div>
			<Dialog>
				<DialogTrigger asChild>
					<div className='flex flex-row items-center justify-around w-full max-w-md py-4 mx-auto hover:cursor-pointer'>
						<div className='flex flex-row items-center gap-2'>
							<Avatar>
								<AvatarImage
									src={
										currentLeader?.publicMetadata?.imageUrl ||
										leaderChallengeData?.user.avatar
									}
								/>
								<AvatarFallback>
									<div className='flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500'>
										<UserRound className='w-6 h-6 text-white' />
									</div>
								</AvatarFallback>
							</Avatar>
							<div className='flex flex-col justify-between'>
								<span className='text-sm'>{leaderPoints}</span>
								<span className='text-xs'>Líder</span>
							</div>
						</div>

						<div className='flex flex-row items-center gap-2'>
							<Avatar>
								<AvatarImage
									src={
										(user.publicMetadata.imageUrl as string) || user.imageUrl
									}
								/>
								<AvatarFallback>
									<div className='flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500'>
										<UserRound className='w-6 h-6 text-white' />
									</div>
								</AvatarFallback>
							</Avatar>
							<div className='flex flex-col justify-between'>
								<span className='text-xs'>{userPoints}</span>
								<span className='text-xs'>Você</span>
							</div>
						</div>

						<div className='flex flex-row items-center gap-2'>
							<Calendar className='w-6 h-6 text-gray-500' />
							<div className='flex flex-col justify-between'>
								<span className='text-xs'>
									{differenceInDays(new Date(challenge.end_date), new Date())}
								</span>
								<span className='text-xs'>dias restantes</span>
							</div>
						</div>
					</div>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle className='self-center text-xl'>Ranking</DialogTitle>
					</DialogHeader>
					<div className='flex flex-col'>
						{leaderboard
							.sort((a, b) => b.duration - a.duration)
							.map((item, index) => {
								const currentUser = userList?.find(
									(user) => user.id === item.user.id,
								)

								return (
									<div key={item.user.id}>
										<div className='flex flex-row items-center justify-between w-full py-2'>
											<div className='flex flex-row items-center gap-2'>
												<Avatar>
													<AvatarImage
														src={
															currentUser?.publicMetadata?.imageUrl ||
															currentUser?.avatar
														}
													/>
													<AvatarFallback>
														<div className='flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500'>
															<UserRound className='w-6 h-6 text-white' />
														</div>
													</AvatarFallback>
												</Avatar>
												<div className='flex flex-col justify-between'>
													<span className='text-sm'>
														{currentUser?.username}
													</span>
													<span className='text-xs'>{item.duration} min</span>
												</div>
											</div>
											<span className='text-sm'>{index + 1}º lugar</span>
										</div>
										<Separator />
									</div>
								)
							})}
					</div>
				</DialogContent>
			</Dialog>
			<Separator />
		</main>
	)
}
