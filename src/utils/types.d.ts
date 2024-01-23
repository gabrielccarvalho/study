export type User = {
	id: string
	username: string | null
	avatar: string
	publicMetadata?: {
		imageUrl: string
	}
}

export type Comment = {
	id: string
	content: string
	created_at: string
	user: User
}

export type Event = {
	id: string
	title: string
	challenge_id?: string
	description?: string
	image?: string
	date: string
	duration: number
	comments: Comment[]
	user: User
	tag?: string
}

export type Challenge = {
	id: string
	title: string
	description: string
	thumbnail: string
	start_date: string
	end_date: string
	members: string[]
	events: Event[]
	leaderboard: {
		user: User
		duration: number
	}[]
	duration: number
	daysintochallenge: number
	progress: number
}

export type addEvent = {
	title: string
	description?: string
	duration: number
	challenge_id?: string
	imageUrl?: string
	tag?: string
}

export type addComment = {
	content: string
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

export type leaveChallenge = {
	challengeId: string
}
