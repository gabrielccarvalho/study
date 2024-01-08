import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trophy } from 'lucide-react'
import { Separator } from '../ui/separator'

const customData = [
	{
		name: 'Gabriel',
		value: 9420,
		ranking: 1,
		gender: 'male',
		color: 'text-yellow-500',
	},
	{
		name: 'Larissa',
		value: 9332,
		ranking: 2,
		gender: 'female',
		color: 'text-gray-400',
	},
	{
		name: 'Arnaldo',
		value: 8742,
		ranking: 3,
		gender: 'male',
		color: 'text-amber-600',
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
		<div className='flex flex-row w-full p-6 mx-auto md:mt-28 max-w-screen-2xl'>
			<div className='flex flex-col flex-1 w-1/2 gap-4'>
				<span className='max-w-xl mb-4 text-6xl '>Motivação para estudar</span>
				<p className='max-w-lg text-md '>
					Com um sistema de gamificação, o Study te ajuda a estudar de forma
					divertida e eficiente, com recompensas e desafios para você se motivar
					a estudar cada vez mais.
				</p>
				<p className='max-w-lg text-md '>
					Para cada minuto que você estuda, você acumula pontos e sobe no
					ranking de cada desafio que você participa.
				</p>
			</div>
			<div className='items-center justify-center hidden w-1/2 mx-auto md:flex bg-confetti'>
				<div className='flex flex-col px-4 overflow-y-scroll border rounded-md shadow-lg max-h-[500px] w-96 border-muted z-20 bg-background'>
					<div className='sticky top-0 z-30 flex items-center w-full py-2 bg-background'>
						<span className='mb-2 text-2xl backdrop-blur-md'>Rankings</span>
					</div>
					{customData.map((item) => (
						<>
							<div className='flex flex-col gap-2' key={item.ranking}>
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
									<div className='flex items-center'>
										{item.color && (
											<Trophy className={`w-6 h-6 mr-2 ${item.color}`} />
										)}
										<span className='text-xl font-bold'>#{item.ranking}</span>
									</div>
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
