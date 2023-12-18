export type User = {
  id: string
  username: string
  avatar: string
}

export type Comment = {
  id: string
  content: string
  created_at: {
    seconds: number
    nanoseconds: number
  }
  user: User
}

export type Event = {
  id: string
  title: string
  description: string
  date: {
    seconds: number
    nanoseconds: number
  }
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
  start_date: {
    seconds: number
    nanoseconds: number
  }
  end_date: {
    seconds: number
    nanoseconds: number
  }
  members: string[]
  events: Event[]
}
