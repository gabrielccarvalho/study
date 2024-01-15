import { ProfileForm } from '@/containers/profile/profile-form'
import { currentUser } from '@clerk/nextjs'

export default async function Profile() {
	const user = await currentUser()

	if (!user) {
		throw new Error('Not authenticated')
	}

	const { firstName, lastName, username, publicMetadata, id, imageUrl } = user
	const { imageUrl: publicImage } = publicMetadata

	return (
		<ProfileForm
			user={{
				id,
				firstName,
				lastName,
				imageUrl: publicImage as unknown as string,
				defaultUserImage: imageUrl,
				username,
			}}
		/>
	)
}
