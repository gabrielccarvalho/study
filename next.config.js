/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		AWS_REGION: process.env.AWS_REGION,
		AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
		AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
		AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
		POSTGRES_URL: process.env.POSTGRES_URL,
		POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
		POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
		POSTGRES_USER: process.env.POSTGRES_USER,
		POSTGRES_HOST: process.env.POSTGRES_HOST,
		POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
		POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.clerk.com',
			},
			{
				protocol: 'https',
				hostname: 'study-image-storage.s3.sa-east-1.amazonaws.com',
			},
		],
	},
}

module.exports = nextConfig
