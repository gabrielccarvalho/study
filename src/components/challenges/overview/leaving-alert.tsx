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
import { Button } from '@/components/ui/button'
import { leaveChallenge } from '@/utils/db-functions'
import { Challenge } from '@/utils/types'
import { useUser } from '@clerk/nextjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function LeaveAlert({ id }: { id: string }) {
	const { user } = useUser()
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

	return (
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
	)
}
