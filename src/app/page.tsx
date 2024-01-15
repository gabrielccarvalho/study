import { Header } from '@/components/home/header'
import { HeroSection } from '@/components/home/hero'
import { LandingFooter } from '@/components/home/landing-footer'
import { Pricing } from '@/components/home/pricing'
import { Track } from '@/components/home/track'

export default function Home() {
	return (
		<>
			<Header />
			<HeroSection />
			<Track />
			<Pricing />
			<LandingFooter />
		</>
	)
}
