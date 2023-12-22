import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '../ui/separator'

const customData = [
	{
		name: 'Gabriel',
		value: 9420,
		ranking: 1,
		gender: 'male',
	},
	{
		name: 'Roger',
		value: 9332,
		ranking: 2,
		gender: 'male',
	},
	{
		name: 'Larissa',
		value: 8742,
		ranking: 3,
		gender: 'female',
	},
	{
		name: 'João',
		value: 5600,
		ranking: 4,
		gender: 'male',
	},
	{
		name: 'Eduardo',
		value: 4190,
		ranking: 5,
		gender: 'male',
	},
	{
		name: 'Marcos',
		value: 4002,
		ranking: 6,
		gender: 'male',
	},
	{
		name: 'Maria',
		value: 3798,
		ranking: 7,
		gender: 'female',
	},
	{
		name: 'Felipe',
		value: 3620,
		ranking: 8,
		gender: 'male',
	},
	{
		name: 'Bruno',
		value: 3223,
		ranking: 9,
		gender: 'male',
	},
	{
		name: 'Roberto',
		value: 2920,
		ranking: 10,
		gender: 'male',
	},
]

export function Showcase() {
	return (
		<div className='flex flex-row w-full p-6 mx-auto mt-20 max-w-screen-2xl'>
			<div className='flex flex-col flex-1 w-1/2 gap-8'>
				<span className='text-6xl font-geist'>Estude se divertindo</span>
				<p className='max-w-lg text-md font-geist'>
					Com um sistema de gamificação, o Study te ajuda a estudar de forma
					divertida e eficiente, com recompensas e desafios para você se motivar
					a estudar cada vez mais.
				</p>
				<p className='max-w-lg text-md font-geist'>
					Para cada minuto que você estuda, você acumula pontos e sobe no
					ranking de cada desafio que você participa. Além disso, você pode
					criar suas próprias etiquetas para acompanhar seu progresso em cada
					matéria.
				</p>
			</div>
			<div className='flex items-center justify-center w-1/2 mx-auto'>
				<div className='flex flex-col px-4 overflow-y-hidden border rounded-md shadow-lg max-h-[550px] w-96 border-muted'>
					<div className='sticky top-0 z-30 flex items-center w-full py-2 bg-background'>
						<span className='mb-2 text-2xl backdrop-blur-md'>Rankings</span>
					</div>
					{customData.map((item) => (
						<>
							<div className='flex flex-col gap-2'>
								<div className='flex flex-row items-center justify-between w-full p-2'>
									<div className='flex items-center justify-between gap-2'>
										<Avatar>
											<AvatarImage
												src={`/image-${item.gender}.svg`}
												alt='User avatar'
											/>
											<AvatarFallback>Usr</AvatarFallback>
										</Avatar>
										<div className='flex flex-col justify-between'>
											<span className='text-lg font-nunito'>{item.name}</span>
											<span className='text-xs font-semibold'>
												{item.value} minutos
											</span>
										</div>
									</div>
									<span className='text-xl font-bold'>#{item.ranking}</span>
								</div>
							</div>
							<Separator className='my-4' />
						</>
					))}
				</div>
			</div>
		</div>
	)
}
