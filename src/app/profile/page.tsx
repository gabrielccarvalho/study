import Image from 'next/image'

import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Nav } from '@/components/nav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { PlusIcon } from 'lucide-react'

export default function Profile() {
  return (
    <>
      <Nav />
      <main className="flex flex-col flex-1 items-center gap-2">
        <div className="flex flex-col gap-2 items-center w-full bg-gradient-to-b from-indigo-500 to-white py-4">
          <Image
            src="https://github.com/gabrielccarvalho.png"
            alt="User Image"
            width={150}
            height={150}
            className="rounded-full"
          />
          <span className="font-semibold text-lg">Gabriel Carvalho</span>
        </div>

        <div className="flex flex-col w-full px-4 py-2 max-w-7xl mx-auto">
          <h2 className="font-bold text-2xl py-2">Perfil</h2>
          <Separator />
          <span className="text-gray-500 text-sm py-2">
            Aqui você pode editar seus dados
          </span>
          <div className="flex flex-col py-4 items-start gap-2 max-w-sm">
            <div>
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input id="name" value="Gabriel Carvalho" disabled />
            </div>
            <div>
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@gabrielccarvalho" disabled />
            </div>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <div className="w-12">
                <Button variant="default">Editar</Button>
              </div>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edite seu Perfil</SheetTitle>
                <SheetDescription>
                  Faça as alterações que desejar. Ao terminar, clique em Salvar
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    value="Gabriel Carvalho"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value="@gabrielccarvalho"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value="teste123"
                    className="col-span-3"
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Salvar</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col w-full px-4 py-2 max-w-7xl mx-auto">
          <h2 className="font-bold text-2xl py-2">Desafios</h2>
          <Separator />

          <div className="flex flex-row py-4 px-4 gap-8 flex-wrap justify-center md:justify-normal">
            <div className="flex flex-col border borrder-border shadow-sm rounded-md w-72">
              <Image
                src="/eagle.jpeg"
                alt="Challenge Image"
                width={300}
                height={300}
                className="rounded-t-md"
              />
              <div className="flex flex-col p-2">
                <span className="font-bold text-lg">Águias</span>
                <span className="text-gray-500 text-sm">
                  Estude mais que todos
                </span>
                <div className="flex flex-col pt-4 items-end gap-1">
                  <Progress value={10} />
                  <span className="text-gray-500 text-xs">36/365</span>
                </div>
                <div className="flex py-2 w-full">
                  <Button variant="default">
                    <span className="text-xs">Ver Desafio</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col border-dashed border shadow-sm rounded-md w-72 items-center justify-center group hover:border-muted-foreground/80 hover:cursor-pointer">
              <PlusIcon
                className="w-16 h-16 text-muted-foreground/40 group-hover:text-muted-foreground/80"
                strokeWidth={1.2}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
