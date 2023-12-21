type date_time = {
	seconds: number
	nanoseconds: number
}

export type User = {
	id: string
	username: string | null
	avatar: string
}

export type Comment = {
	id: string
	content: string
	created_at: date_time
	user: User
}

export type Event = {
	id: string
	title: string
	description: string
	image: string
	date: date_time
	description: string
	duration: number
	comments: Comment[]
	user: User
}

export type Challenge = {
	id: string
	title: string
	description: string
	thumbnail: string
	start_date: date_time
	end_date: date_time
	members: string[]
	events: Event[]
	leaderBoard: {
		user: User
		duration: number
	}[]
	duration: number
	daysIntoChallenge: number
	progress: number
}
