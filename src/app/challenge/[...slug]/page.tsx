import { Nav } from '@/components/nav'
import { ChallengeOverviewHeader } from '@/components/challenge-overview'
// import { ChallengeEventList } from '@/components/challenge-event-list'
import { ChallengeHistory } from '@/components/challenge-history'

export default function Challenge({ params }: { params: { slug: string[] } }) {
  return (
    <main className="flex flex-col h-screen">
      <Nav />
      <ChallengeOverviewHeader id={params.slug[0]} />
      {/* <ChallengeEventList id={params.slug[0]} /> */}
      <ChallengeHistory id={params.slug[0]} />
    </main>
  )
}
