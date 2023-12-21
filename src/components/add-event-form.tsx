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
import { useToast } from '@/components/ui/use-toast'
import { useChallenge } from '@/context/challenge-context'
import { useEffect, useState } from 'react'

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.string(),
  challenge: z.string(),
  file: z.any(),
})

export function AddEventForm() {
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const { challenges, addEvent } = useChallenge()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      const { title, description, duration, challenge } = values

      addEvent({
        title,
        description,
        duration: parseInt(duration),
        challenge,
        imageUrl: data.image,
      })
    } catch (error) {
      console.error(error)
    }

    toast({
      title: 'Estudo adicionado!',
      description: `Seu estudo "${values.title}" com duração de ${values.duration} minutos foi adicionado!`,
      variant: 'success',
    })
  }

  useEffect(() => {
    if (Object.values(form.formState.errors).length > 0) {
      toast({
        title: 'Falha ao adicionar estudo!',
        description: `Seu estudo não pode ser computado`,
        variant: 'destructive',
      })
    }
  }, [form.formState.errors, toast])

  const challengesInfo = challenges.map((challenge) => {
    return {
      id: challenge.id,
      title: challenge.title,
    }
  })

  return (
    <Form {...form}>
      <form
        id="add-event-form"
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
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagem</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    if (!e.target.files) return
                    setFile(e.target.files[0])
                  }}
                />
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
      </form>
    </Form>
  )
}
