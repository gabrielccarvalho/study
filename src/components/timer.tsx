'use client'

import { intervalToDuration } from 'date-fns'
import { Pause, Play, Square } from 'lucide-react'
import { useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import { Button } from './ui/button'

export function Timer() {
	const [time, setTime] = useState<string>('')

	function handleStartTimer() {
		const now = new Date().getTime().toString()
		localStorage.setItem('@study-app#timer', now)
	}

	function handleStopTimer() {
		localStorage.removeItem('@study-app#timer')
		setTime('')
	}

	useEffect(() => {
		const timerInterval = setInterval(() => {
			const startedTime = localStorage.getItem('@study-app#timer')

			if (startedTime) {
				const now = new Date().getTime()
				const started = Number(startedTime)

				const { hours, minutes, seconds } = intervalToDuration({
					start: started,
					end: now,
				})

				setTime(
					`${String(hours).padStart(2, '0')}:${String(minutes).padStart(
						2,
						'0',
					)}:${String(seconds).padStart(2, '0')}`,
				)
			}
		}, 1000)

		return () => clearInterval(timerInterval)
	}, [])

	return (
		<Draggable bounds='parent'>
			<div className='absolute flex flex-col items-center w-full max-w-xs gap-2 py-6 border-2 rounded-md border-border bottom-12 left-24 backdrop-blur-md hover:cursor-grab'>
				<span className='text-2xl'>{time || '00:00:00'}</span>
				<div className='flex flex-row gap-2'>
					{!time ? (
						<Button variant='ghost' onClick={handleStartTimer}>
							<Play className='w-6 h-6 mr-2' />
							<span className='font-bold text-md'>Começar</span>
						</Button>
					) : (
						<Button variant='ghost' onClick={handleStopTimer}>
							<Square className='w-6 h-6 mr-2' />
							<span className='font-bold text-md'>Parar</span>
						</Button>
					)}
				</div>
			</div>
		</Draggable>
	)
}
