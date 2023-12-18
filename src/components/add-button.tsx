'use client'

import { CornerDownRight, PlusCircleIcon, PlusIcon } from 'lucide-react'
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { AddEventForm } from './add-event-form'
import { AddChallengeForm } from './add-challenge-form'
import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { useEffect } from 'react'
import { toast } from './ui/use-toast'
import { useChallenge } from '@/context/challenge-context'

const formSchema = z.object({
  id: z.string(),
})

export function AddButton() {
  const { joinChallenge } = useChallenge()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    joinChallenge(values.id)
  }

  useEffect(() => {
    if (Object.values(form.formState.errors).length > 0) {
      toast({
        title: 'Falha ao entrar no desafio!',
        description: `Parece que você deixou o campo vazio ou o desafio não existe 🙁`,
        variant: 'destructive',
      })

      form.reset()
    }
  }, [form, form.formState.errors])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="fixed flex items-center justify-center w-10 h-10 rounded-full md:w-12 md:h-12 right-6 bottom-16 md:right-10 md:bottom-10 bg-primary hover:cursor-pointer hover:bg-primary/80">
          <PlusIcon className="w-4 h-4 md:w-6 md:h-6 text-primary-foreground" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-start px-4 mr-20 -mb-4">
        <DropdownMenuLabel asChild>
          <div className="flex items-center">
            <span className="font-semibold text-md">Adicionar</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex flex-row items-center cursor-pointer hover:text-emerald-500">
                <PlusCircleIcon className="w-4 h-4 mr-1 text-emerald-500" />
                <span className="text-sm">Estudo</span>
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
                <span className="text-sm">Desafio</span>
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
                    <Button type="submit" form="add-challenge-form">
                      Salvar
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel asChild>
          <div className="flex items-center">
            <span className="font-semibold text-md">Entrar</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex flex-row items-start cursor-pointer hover:text-emerald-500">
                <CornerDownRight className="w-4 h-4 mr-1 text-emerald-500" />
                <span className="text-sm">Desafio</span>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Se juntar a um desafio</DialogTitle>
                <DialogDescription>
                  Se junte a um desafio colocando o código dele abaixo! Clique
                  em Salvar quando tiver terminado.
                </DialogDescription>
                <Form {...form}>
                  <form
                    id="join-event-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <FormField
                      control={form.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cole o código do desafio aqui!</FormLabel>
                          <FormControl>
                            <Input placeholder="id do desafio" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
                <DialogFooter className="sm:justify-center">
                  <DialogClose asChild>
                    <Button type="submit" form="join-event-form">
                      Salvar
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
