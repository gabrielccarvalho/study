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
import { deleteEvent } from '@/utils/db-functions'
import { Event } from '@/utils/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Ban } from 'lucide-react'

export function DeleteConfirmation({ id }: { id: string }) {
	const queryClient = useQueryClient()

	const { mutateAsync: deleteEventFn } = useMutation({
		mutationFn: deleteEvent,
		onSuccess() {
			queryClient.setQueryData(['events'], (prevEvents: Event[]) => {
				return prevEvents.filter((event) => event.id !== id)
			})
		},
	})

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
					<AlertDialogAction onClick={() => deleteEventFn({ id })}>
						Deletar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
