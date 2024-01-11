import { Header } from '@/components/home/header'
import { HeroSection } from '@/components/home/hero'
import { LandingFooter } from '@/components/home/landing-footer'
import { OpenSource } from '@/components/home/open-source'
import { Showcase } from '@/components/home/showcase'
import { Track } from '@/components/home/track'
import { Tracking } from '@/components/home/tracking'

export default function Home() {
	return (
		<>
			<Header />
			<HeroSection />
			<Track />
			<LandingFooter />
		</>
	)
}
