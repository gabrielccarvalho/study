import { Header } from '@/components/Home/header'
import { LandingFooter } from '@/components/Home/landing-footer'
import { OpenSource } from '@/components/Home/open-source'
import { Tracking } from '@/components/Home/tracking'

export default function Home() {
	return (
		<>
			<Header />
			<Tracking />
			<OpenSource />
			<LandingFooter />
		</>
	)
}
