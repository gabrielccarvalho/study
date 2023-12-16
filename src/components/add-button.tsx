import { PlusIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AddEventForm } from './add-event-form'

export function AddButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="absolute flex items-center justify-center w-12 h-12 bg-indigo-500 rounded-full bottom-10 right-10 hover:cursor-pointer hover:bg-indigo-700">
          <PlusIcon className="w-6 h-6 text-white" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar um evento</DialogTitle>
          <DialogDescription>
            Adicione uma sessão de estudos a um desafio! Clique em Salvar quando
            tiver termiado.
          </DialogDescription>
          <AddEventForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
