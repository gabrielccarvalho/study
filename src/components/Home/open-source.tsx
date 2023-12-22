'use client'

import createGlobe from 'cobe'
import { MoveUpRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Button } from '../ui/button'

export function OpenSource() {
	const { theme } = useTheme()
	const canvasRef = useRef<HTMLCanvasElement>(
		null as unknown as HTMLCanvasElement,
	)

	useEffect(() => {
		let phi = 0

		const globe = createGlobe(canvasRef.current, {
			devicePixelRatio: 2,
			width: 500 * 2,
			height: 500 * 2,
			phi: 0,
			theta: 0,
			dark: theme === 'dark' ? 1 : 0,
			diffuse: 1.2,
			mapSamples: 16000,
			mapBrightness: 6,
			baseColor: theme === 'dark' ? [0.3, 0.3, 0.3] : [1, 1, 1],
			markerColor: [0.1, 0.8, 1],
			glowColor: theme === 'dark' ? [1, 1, 1] : [0.3, 0.3, 0.3],
			markers: [
				// longitude latitude
				{ location: [-5.787858, -35.19516], size: 0.1 },
				{ location: [40.7128, -74.006], size: 0.05 },
			],
			onRender: (state) => {
				// Called on every animation frame.
				// `state` will be an empty object, return updated params.
				state.phi = phi
				phi += 0.003
			},
		})

		return () => {
			globe.destroy()
		}
	}, [theme])

	return (
		<>
			<div
				id='open-source'
				className='flex flex-row-reverse justify-between flex-1 gap-6 px-6 py-8 mx-auto my-20 max-w-screen-2xl'
			>
				<div className='flex flex-col flex-1 gap-10'>
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
					>
						<Button
							size='lg'
							className='flex items-center transition-all duration-100 hover:scale-110'
						>
							Acessar Repositório
							<MoveUpRight className='w-5 h-5 ml-2' />
						</Button>
					</Link>
				</div>
				<div className='flex flex-row w-3/5'>
					<canvas
						ref={canvasRef}
						style={{
							width: 500,
							height: 500,
							// maxWidth: '100%',
							aspectRatio: 1,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: 'transparent',
						}}
					/>
				</div>
			</div>
		</>
	)
}
