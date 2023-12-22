import Image from 'next/image'

export function Showcase() {
	return (
		<>
			<div
				id='platform'
				className='flex flex-col flex-1 max-w-6xl py-8 mx-auto mt-8'
			>
				<div className='flex items-end justify-between'>
					<span className='max-w-md text-6xl font-geist'>Nossa Plataforma</span>
					<p className='max-w-lg text-lg font-light font-geist'>
						Crie desafios, chame amigos, acompanhe seu progresso e seja o líder
					</p>
				</div>
				<div className='flex flex-col w-full py-8 mt-4'>
					<Image
						src='/mock_home.png'
						alt='Nossa plataforma'
						width={1920}
						height={1080}
						layout='responsive'
						className=''
					/>
				</div>
			</div>
		</>
	)
}
