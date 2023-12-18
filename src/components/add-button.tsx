import { PlusCircleIcon, PlusIcon } from 'lucide-react'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { AddEventForm } from './add-event-form'
import { AddChallengeForm } from './add-challenge-form'
import { Button } from './ui/button'

export function AddButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="fixed flex items-center justify-center w-10 h-10 rounded-full md:w-12 md:h-12 right-6 bottom-16 md:right-10 md:bottom-10 bg-primary hover:cursor-pointer hover:bg-primary/80">
          <PlusIcon className="w-4 h-4 md:w-6 md:h-6 text-primary-foreground" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-start px-4 mr-20 -mb-4">
        <DropdownMenuItem asChild>
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex flex-row items-center cursor-pointer hover:text-emerald-500">
                <PlusCircleIcon className="w-4 h-4 mr-1 text-emerald-500" />
                <span>Estudo</span>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar um evento</DialogTitle>
                <DialogDescription>
                  Adicione uma sessão de estudos a um desafio! Clique em Salvar
                  quando tiver terminado.
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
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex flex-row items-center cursor-pointer hover:text-emerald-500">
                <PlusCircleIcon className="w-4 h-4 mr-1 text-emerald-500" />
                <span>Desafio</span>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar um desafio</DialogTitle>
                <DialogDescription>
                  Adicione um novo desafio e chame seus amigos! Clique em Salvar
                  quando tiver terminado.
                </DialogDescription>
                <AddChallengeForm />
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
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
