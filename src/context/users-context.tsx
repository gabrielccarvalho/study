'use client'

import { User } from '@/utils/types'
import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext({
	userList: [] as User[],
})

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [userList, setUsers] = useState<User[]>([])

	useEffect(() => {
		const fetchUsers = async () => {
			const userList = await fetch('/api/clerk/fetch-users', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}).then(async (item) => {
				const response = await item.json()

				setUsers(response.users as User[])

				return response
			})

			return userList
		}

		fetchUsers()
	}, [])
	return (
		<UserContext.Provider value={{ userList }}>{children}</UserContext.Provider>
	)
}

export function useUsers() {
	const { userList } = useContext(UserContext)

	return {
		userList,
	}
}
