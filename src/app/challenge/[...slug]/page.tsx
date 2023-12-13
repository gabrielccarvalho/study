import { Nav } from '@/components/nav'
import { ChallengeOverview } from '@/components/challenge-overview'

export default function Challenge({ params }: { params: { slug: string[] } }) {
  return (
    <>
      <Nav />
      <ChallengeOverview id={params.slug[0]} />
    </>
  )
}
