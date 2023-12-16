'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useChallenge } from '@/context/challenge-context'

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.string(),
  challenge: z.string(),
})

export function AddEventForm() {
  const { toast } = useToast()
  const { challenges, addEvent } = useChallenge()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    addEvent(values)

    toast({
      title: 'Estudo adicionado!',
      description: `Seu estudo "${values.title}" com duração de ${values.duration} minutos foi adicionado!`,
      variant: 'success',
    })
  }

  const challengesInfo = challenges.map((challenge) => {
    if (!challenge) return {}
    return {
      id: challenge.id,
      title: challenge.title,
    }
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do estudo</FormLabel>
              <FormControl>
                <Input placeholder="estudo sobre ..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do estudo</FormLabel>
              <FormControl>
                <Input placeholder="estudei matemática ..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duração do estudo</FormLabel>
              <FormControl>
                <Input placeholder="60" type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="challenge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desafio</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um desafio" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {challengesInfo.map((challenge) => (
                    <SelectItem key={challenge.id} value={challenge.id}>
                      {challenge.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-2">
          Salvar
        </Button>
      </form>
    </Form>
  )
}
