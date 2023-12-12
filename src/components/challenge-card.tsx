import Image from 'next/image'

import { Progress } from '@/components/ui/progress'
import { Button } from './ui/button'

type ChallengeCardProps = {
  title: string
  description: string
  progress: number
  href: string
}

export function ChallengeCard({
  title,
  description,
  progress,
  href,
}: ChallengeCardProps) {
  return (
    <div className="flex flex-col border borrder-border shadow-sm rounded-md w-72">
      <Image
        src={href}
        alt="Challenge Image"
        width={300}
        height={300}
        className="rounded-t-md"
      />
      <div className="flex flex-col p-2">
        <span className="font-bold text-lg">{title}</span>
        <span className="text-gray-500 text-sm">{description}</span>
        <div className="flex flex-col pt-4 items-end gap-1">
          <Progress value={progress} />
          <span className="text-gray-500 text-xs">36/365</span>
        </div>
        <div className="flex py-2 w-full">
          <Button variant="default">
            <span className="text-xs">Ver Desafio</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
