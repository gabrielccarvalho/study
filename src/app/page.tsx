import Image from 'next/image'
import { currentUser } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'
import { Nav } from '@/components/nav'
import { PlusIcon } from 'lucide-react'
import { ChallengeCard } from '@/components/challenge-card'

export default async function Home() {
  const user = await currentUser()

  if (!user) {
    return <></>
  }
  return (
    <>
      <Nav />
      <main className="flex flex-col flex-1 items-center gap-2">
        <div className="flex flex-col gap-2 items-center w-full bg-gradient-to-b from-indigo-500 to-white py-4">
          <Image
            src={user.imageUrl}
            alt="User Image"
            width={150}
            height={150}
            className="rounded-full"
          />
          <span className="font-semibold text-lg">
            {user.firstName
              ? `${user.firstName} ${user.lastName}`
              : user.username}
          </span>
        </div>

        <div className="flex flex-col w-full px-4 py-2 max-w-7xl mx-auto">
          <h2 className="font-bold text-2xl py-2">Desafios</h2>
          <Separator />

          <div className="flex flex-row py-4 px-4 gap-8 flex-wrap justify-center md:justify-normal">
            <ChallengeCard
              title="Águias"
              description="Estude mais que todos!"
              progress={10}
              href="/eagle.jpeg"
            />

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
