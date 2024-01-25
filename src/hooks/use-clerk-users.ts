import { User } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

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

export function useClerkUsers() {
	const {
		data: userList,
		isSuccess,
		isLoading,
	} = useQuery({
		queryKey: ['users'],
		queryFn: fetchUsers,
	})

	return {
		userList,
		isSuccess,
		isLoading,
	}
}
