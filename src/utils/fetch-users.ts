import { User } from './types'

export async function fetchUsers(): Promise<User[]> {
	const res = await fetch('/api/clerk/fetch-users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const { users } = await res.json()

	return users
}
