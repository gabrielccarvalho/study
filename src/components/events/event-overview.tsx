'use client'

import Image from 'next/image'
import Link from 'next/link'
import { format, formatDistance } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { ChevronLeft } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useChallenge } from '@/context/challenge-context'
import { Input } from '@/components/ui/input'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { toast } from '../ui/use-toast'
import { Skeleton } from '../ui/skeleton'

const formSchema = z.object({
  content: z.string(),
})

function LoadingSkeleton() {
  return (
    <main className="flex flex-col flex-1 w-full max-w-4xl p-4 mx-auto">
      <ChevronLeft className="w-8 h-8" />
      <div className="flex flex-col items-center w-full max-w-md mx-auto mt-2">
        <Skeleton className="w-[450px] h-[450px] shadow-md rounded-b-none" />
        <div className="flex flex-col w-full max-w-md px-4 py-2 bg-muted rounded-b-md">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-12 h-3 my-1 ml-2" />
            </div>
            <Skeleton className="w-8 h-2" />
          </div>
          <Separator className="my-1" />
          <div className="flex flex-col">
            <Skeleton className="w-32 h-3 my-1" />
            <Skeleton className="w-24 h-2" />
            <Skeleton className="w-24 h-2" />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center w-full max-w-md gap-2 p-2 mx-auto mt-2 rounded-md shadow-md bg-muted">
        <Skeleton className="w-8 h-8 rounded-full" />
        <div className="flex justify-between flex-1 gap-2">
          <div className="flex flex-col flex-1 gap-1">
            <Skeleton className="w-16 h-4 mb-2" />
            <Skeleton className="w-1/2 h-3" />
            <Skeleton className="w-1/3 h-3" />
            <Skeleton className="w-8 h-2 mt-3" />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center w-full max-w-md gap-2 p-2 mx-auto mt-2 rounded-md shadow-md bg-muted">
        <Skeleton className="w-8 h-8 rounded-full" />
        <div className="flex justify-between flex-1 gap-2">
          <div className="flex flex-1">
            <Input placeholder="adicione um comentario" />
          </div>

          <Button type="submit">Enviar</Button>
        </div>
      </div>
    </main>
  )
}

export function EventOverview({ id, event }: { id: string; event: string }) {
  const { challenges, addComment } = useChallenge()
  const { user } = useUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  })

  const challenge = challenges.find((challenge) => challenge?.id === id)

  if (!challenge || !user) {
    return <LoadingSkeleton />
  }

  const currentEvent = challenge.events.find(
    (evt: Record<string, unknown>) => evt.id === event,
  )

  function onSubmit(values: z.infer<typeof formSchema>) {
    addComment({
      challengeId: id,
      eventId: event,
      content: values.content,
    })

    form.reset()

    toast({
      title: 'Comentario enviado!',
      variant: 'success',
    })
  }

  return (
    <main className="flex flex-col flex-1 w-full max-w-4xl p-4 mx-auto">
      <Link href={`/challenge/${id}`} className="sticky top-16">
        <ChevronLeft className="w-8 h-8" />
      </Link>
      <div className="flex flex-col items-center w-full max-w-md mx-auto mt-2">
        <Image
          src={currentEvent.image}
          alt="event image"
          width={500}
          height={500}
          className="shadow-md rounded-t-md"
        />
        <div className="flex flex-col w-full max-w-md px-4 py-2 border border-t-0 shadow-lg bg-muted rounded-b-md border-muted-foreground/10">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <Avatar className="w-8 h-8">
                <AvatarImage src={currentEvent.user.avatar} />
                <AvatarFallback>
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-black to-indigo-700"></div>
                </AvatarFallback>
              </Avatar>
              <span className="ml-2 text-md">{currentEvent.user.username}</span>
            </div>
            <span className="text-sm font-thin">
              {format(
                new Date(currentEvent.date.seconds * 1000),
                "hh:mm aaaaa'm'",
              )}
            </span>
          </div>
          <Separator className="my-1" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{currentEvent.title}</span>
            <span className="font-thin text-md">
              {currentEvent.description}
            </span>
            <span className="mt-2 text-xs font-thin">
              Ativo por {currentEvent.duration} minutos
            </span>
          </div>
        </div>
      </div>
      {currentEvent.comments &&
        currentEvent.comments.map(
          (comment: {
            id: string
            user: {
              avatar: string
              username: string
            }
            content: string
            created_at: { seconds: number }
          }) => {
            return (
              <div
                key={comment.id}
                className="flex flex-row w-full max-w-md gap-2 p-2 mx-auto mt-2 border rounded-md shadow-md bg-muted border-muted-foreground/10"
              >
                <Avatar className="w-7 h-7">
                  <AvatarImage src={comment.user.avatar} />
                  <AvatarFallback>
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-black to-indigo-700"></div>
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-between">
                  <span className="text-sm font-semibold">
                    {comment.user.username}
                  </span>
                  <span className="text-sm font-light">{comment.content}</span>
                  <span className="mt-2 text-xs font-thin">
                    {formatDistance(
                      new Date(comment.created_at.seconds * 1000),
                      new Date(),
                      { addSuffix: true, locale: ptBR },
                    )}
                  </span>
                </div>
              </div>
            )
          },
        )}
      <div className="flex flex-row items-center w-full max-w-md gap-2 p-2 mx-auto mt-2 border rounded-md shadow-md bg-muted border-muted-foreground/10">
        <Avatar className="w-7 h-7">
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback>
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-black to-indigo-700"></div>
          </AvatarFallback>
        </Avatar>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex justify-between flex-1 gap-2"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex flex-1">
                  <FormControl>
                    <Input
                      placeholder="adicione um comentario"
                      {...field}
                      className="border-muted-foreground/20"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit">Enviar</Button>
          </form>
        </Form>
      </div>
    </main>
  )
}
