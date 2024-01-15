import { Header } from '@/containers/landing-page/header'
import { HeroSection } from '@/containers/landing-page/hero'
import { LandingFooter } from '@/containers/landing-page/landing-footer'
import { Pricing } from '@/containers/landing-page/pricing'
import { StudyTrack } from '@/containers/landing-page/track'

export default function Home() {
	return (
		<>
			<Header />
			<HeroSection />
			<StudyTrack />
			<Pricing />
			<LandingFooter />
		</>
	)
}
