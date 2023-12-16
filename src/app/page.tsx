import Image from 'next/image'
import { currentUser } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'
import { Nav } from '@/components/nav'
import { ChallengeList } from '@/components/challenges/challenge-card-list'

export default async function Home() {
  const user = await currentUser()

  if (!user) {
    return <></>
  }

  return (
    <>
      <Nav />
      <main className="flex flex-col flex-1 gap-2">
        <div className="flex flex-col items-center w-full gap-2 py-4 bg-gradient-to-b from-indigo-500 to-white">
          <Image
            src={user.imageUrl}
            alt="User Image"
            width={150}
            height={150}
            className="rounded-full"
          />
          <span className="text-lg font-semibold">
            {user.firstName
              ? `${user.firstName} ${user.lastName}`
              : user.username}
          </span>
        </div>

        <div className="flex flex-col w-full px-4 py-2 mx-auto max-w-7xl">
          <h2 className="py-2 text-2xl font-bold">Desafios</h2>
          <Separator />

          <div className="flex flex-row flex-wrap justify-center gap-8 px-4 py-4 md:justify-normal">
            <ChallengeList />
          </div>
        </div>
      </main>
    </>
  )
}
