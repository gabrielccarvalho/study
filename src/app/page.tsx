import { Testimonials } from '@/components/landing-page/feedbacks'
import { Header } from '@/containers/landing-page/header'
import { HeroSection } from '@/containers/landing-page/hero'
import { LandingFooter } from '@/containers/landing-page/landing-footer'
import { OurTeam } from '@/containers/landing-page/our-team'
import { StudyTrack } from '@/containers/landing-page/track'

export default function Home() {
	return (
		<>
			<Header />
			<OurTeam />
			<Testimonials />
			<HeroSection />
			<LandingFooter />
		</>
	)
}
