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

export type addEvent = {
	title: string
	description: string
	duration: number
	challenge: string
	imageUrl: string
}

export type addComment = {
	content: string
	challengeId: string
	eventId: string
}

export type addChallenge = {
	title: string
	description: string
	thumbnail: string
	startDate: Date
	endDate: Date
	events: Event[]
	members: string[]
}

export type joinChallenge = {
	challengeId: string
}
