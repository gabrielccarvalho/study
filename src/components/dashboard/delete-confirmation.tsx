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
import { useChallenge } from '@/context/challenge-context'

import { Ban } from 'lucide-react'

export function DeleteConfirmation({ id }: { id: string }) {
	const { deleteEvent } = useChallenge()
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<span className='flex items-center'>
					<Ban className='w-4 h-4 mr-2' />
					Deletar Estudo
				</span>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Tem certeza que quer deletar esse Evento?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Essa ação não pode ser desfeita. Isso irá deletar permanentemente
						seu evento.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={() => deleteEvent({ id })}>
						Deletar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
