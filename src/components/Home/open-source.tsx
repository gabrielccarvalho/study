import { MoveUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

export function OpenSource() {
	return (
		<>
			<div
				id='open-source'
				className='flex flex-row-reverse justify-between flex-1 max-w-6xl gap-4 py-8 mx-auto my-8'
			>
				<div className='flex flex-col self-start gap-10'>
					<div className='flex flex-col gap-4'>
						<span className='max-w-md text-6xl font-geist'>Open Source</span>
						<p className='max-w-lg text-lg font-light font-geist'>
							O Study é um projeto 100% open source, se tiver alguma ideia ou
							quiser navegar pelo projeto, acesse nosso repositório no GitHub
						</p>
					</div>
					<Link
						href='https://github.com/gabrielccarvalho/study'
						target='_blank'
						className='flex flex-row items-center'
					>
						<Button
							size='lg'
							className='transition-all duration-100 hover:scale-110'
						>
							Acessar Repositório
							<MoveUpRight className='w-5 h-5 ml-2' />
						</Button>
					</Link>
				</div>
				<div className='flex flex-row items-start justify-start max-w-md h-96'>
					<Image
						src='/github.png'
						alt='GitHub'
						width={500}
						height={500}
						className=''
					/>
				</div>
			</div>
		</>
	)
}
