import { CheckIcon } from 'lucide-react'
import { JSX, SVGProps } from 'react'
import { Button } from '../ui/button'
import { PricingCard } from './pricing-card'

export function Pricing() {
	return (
		<section className='w-full py-6 bg-gray-200 dark:bg-black md:py-6 lg:py-12 xl:py-24'>
			<div className='container px-4 md:px-6'>
				<div className='grid items-center gap-6'>
					<div className='flex flex-col justify-center text-center md:space-y-8'>
						<div className='space-y-4'>
							<h1 className='text-2xl font-bold tracking-tighter text-transparent bg-black text-start md:text-center md:text-3xl sm:text-5xl xl:text-6xl/none bg-clip-text bg-gradient-to-r dark:from-gray-400 dark:to-white'>
								Nossos Planos
							</h1>
							<p className='mx-auto text-sm md:max-w-screen-md md:text-xl md:text-center text-start'>
								Escolha o plano que mais se adequa a você e comece a estudar
								agora mesmo!
							</p>
						</div>
						<div className='grid gap-6 pt-6 lg:grid-cols-3 lg:gap-12 md:pt-0'>
							<PricingCard
								title='Grátis'
								description='Ideal para quem está começando'
								price={0}
								features={[
									'Métricas de Estudo',
									'Monitoramento de Progresso',
									'Até 3 Desafios',
									'Criação de cartões',
								]}
								notIncluded={[
									'Acesso a todos os pacotes de cartões',
									'0 Licenças',
								]}
								cta='Começe sem custos!'
							/>

							<PricingCard
								title='Pro'
								description='Ideal para quem quer ir para o próximo nível'
								price={19.99}
								features={[
									'Métricas de Estudo',
									'Monitoramento de Progresso',
									'Desafios ilimitados',
									'Criação de cartões',
									'Acesso a todos os pacotes de cartões',
									'1 Licença',
								]}
								cta='Começe agora!'
								redirect='https://buy.stripe.com/fZeeYxfsw30G2e4289'
							/>
							<PricingCard
								title='Personalizado'
								description='Ideal para empresas e escolas'
								price={99.99}
								features={[
									'Métricas de Estudo',
									'Monitoramento de Progresso',
									'Desafios ilimitados',
									'Criação de cartões',
									'Acesso a todos os pacotes de cartões',
									'Licenças sob demanda',
								]}
								cta='Fale com nosso time!'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function BarChart2Icon(
	props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<line x1='18' x2='18' y1='20' y2='10' />
			<line x1='12' x2='12' y1='20' y2='4' />
			<line x1='6' x2='6' y1='20' y2='14' />
		</svg>
	)
}

function TrophyIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='M6 9H4.5a2.5 2.5 0 0 1 0-5H6' />
			<path d='M18 9h1.5a2.5 2.5 0 0 0 0-5H18' />
			<path d='M4 22h16' />
			<path d='M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22' />
			<path d='M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22' />
			<path d='M18 2H6v7a6 6 0 0 0 12 0V2Z' />
		</svg>
	)
}

function TrendingUpIcon(
	props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<polyline points='22 7 13.5 15.5 8.5 10.5 2 17' />
			<polyline points='16 7 22 7 22 13' />
		</svg>
	)
}
