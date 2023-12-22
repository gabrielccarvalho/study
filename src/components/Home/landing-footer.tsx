export function LandingFooter() {
	return (
		<>
			<div className='flex flex-row justify-between p-6'>
				<div className='flex flex-row items-center'>
					<span className='mr-1 font-bold text-md font-geist'>study.app</span>
					<span className='text-xs font-light font-geist'>
						All rights reserved © 2023
					</span>
				</div>
				<div className='flex flex-row items-center'>
					<span className='text-xs font-light font-geist'>
						Feito com 🤍 por{' '}
						<a
							href='https://github.com/gabrielccarvalho'
							target='_blank'
							className='font-bold text-md font-geist'
							rel='noreferrer'
						>
							Gabriel Campos
						</a>
					</span>
				</div>
			</div>
		</>
	)
}
