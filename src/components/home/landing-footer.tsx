export function LandingFooter() {
	return (
		<>
			<div className='flex flex-row justify-between p-6'>
				<div className='flex flex-row items-center justify-between flex-1 md:flex-auto md:justify-normal'>
					<span className='mr-1 font-bold text-md '>study.app</span>
					<span className='text-xs font-light '>
						All rights reserved © 2023
					</span>
				</div>
				<div className='flex-row items-center hidden md:flex'>
					<span className='text-xs font-light'>
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
