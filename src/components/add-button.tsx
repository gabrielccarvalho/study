import { PlusIcon } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AddEventForm } from './add-event-form'
import { Button } from './ui/button'

export function AddButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="absolute flex items-center justify-center w-12 h-12 rounded-full bg-primary bottom-10 right-10 hover:cursor-pointer hover:bg-primary/80">
          <PlusIcon className="w-6 h-6 text-white" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar um evento</DialogTitle>
          <DialogDescription>
            Adicione uma sessão de estudos a um desafio! Clique em Salvar quando
            tiver terminado.
          </DialogDescription>
          <AddEventForm />
          <DialogFooter className="sm:justify-center">
            <DialogClose asChild>
              <Button type="submit" form="add-event-form">
                Salvar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
