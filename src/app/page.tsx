import { Header } from '@/components/home/header'
import { LandingFooter } from '@/components/home/landing-footer'
import { OpenSource } from '@/components/home/open-source'
import { Showcase } from '@/components/home/showcase'
import { Tracking } from '@/components/home/tracking'

export default function Home() {
	return (
		<>
			<Header />
			<Tracking />
			<Showcase />
			<OpenSource />
			<LandingFooter />
		</>
	)
}
