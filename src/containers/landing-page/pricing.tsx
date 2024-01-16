import { PricingCard } from '@/components/landing-page/pricing-card'

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
