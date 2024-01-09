// import { CardPreview } from '@/components/store/card-preview'
import { Separator } from '@/components/ui/separator'

export default function Store() {
	return (
		<div className='flex flex-col flex-1 py-2'>
			<div className='flex flex-col gap-2 px-4'>
				<h1 className='text-2xl font-medium'>Loja</h1>
				<p className='text-sm text-gray-500'>
					Aqui você pode ver todos os pacotes disponíveis na plataforma para
					compra.
				</p>
			</div>
			<Separator className='my-4' />
			<div className='flex flex-row flex-wrap justify-center gap-8 px-8 md:justify-normal'>
				{/* <CardPreview
					title='Inglês Básico'
					price={29.99}
					cardAmount={20}
					description='Aprenda o necessário para se comunicar em inglês nesse pacote de flashcards.'
					imageUrl='https://study-image-storage.s3.sa-east-1.amazonaws.com/gatinho-1703823489435.jpeg'
				/>
				<CardPreview
					title='Alguma outra coisa'
					price={49.99}
					cardAmount={50}
					description='Aprenda alguma coisa ai, com esse pacote de flashcards caro pra caralho que eu nem sei o que é.'
					imageUrl='https://study-image-storage.s3.sa-east-1.amazonaws.com/avatar-1703821500412.jpeg'
				/> */}
			</div>
		</div>
	)
}
