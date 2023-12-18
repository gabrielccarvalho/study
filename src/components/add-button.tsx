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
        <div className="fixed flex items-center justify-center w-10 h-10 rounded-full md:w-12 md:h-12 right-6 bottom-16 md:right-10 md:bottom-10 bg-primary hover:cursor-pointer hover:bg-primary/80">
          <PlusIcon className="w-4 h-4 md:w-6 md:h-6 text-primary-foreground" />
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
