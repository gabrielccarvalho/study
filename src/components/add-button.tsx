import { PlusIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

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
        </DialogHeader>
        <div className="flex flex-col flex-1 gap-4 p-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Título
            </Label>
            <div className="flex items-center justify-end w-full">
              <Input
                id="title"
                placeholder="Um estudo sobre..."
                className="w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <div className="flex items-center justify-end w-full">
              <Input
                id="description"
                placeholder="leis de newton..."
                className="w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Duração
            </Label>
            <div className="flex items-center justify-end w-full">
              <Input
                id="description"
                type="number"
                placeholder="60"
                className="w-64"
              />
            </div>
          </div>
          <div className="flex items-start justify-start gap-10">
            <Label htmlFor="description" className="text-right">
              Desafio
            </Label>
            <div className="flex flex-col items-start w-64 gap-2">
              <div className="flex flex-row gap-2">
                <Switch defaultChecked />
                <span className="text-sm font-thin text-right">Aguias</span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
