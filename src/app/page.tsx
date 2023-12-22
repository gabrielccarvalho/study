import { Header } from '@/components/Home/header'
import { LandingFooter } from '@/components/Home/landing-footer'
import { Showcase } from '@/components/Home/showcase'
import { Tracking } from '@/components/Home/tracking'

export default function Home() {
	return (
		<>
			<Header />
			<Tracking />
			<Showcase />
			<LandingFooter />
		</>
	)
}
