import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'

const s3Client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
})

async function uploadFileToS3(file: Buffer, fileName: string) {
  const fileBuffer = file

  const Key = `${fileName.split('.')[0]}-${Date.now()}.${
    fileName.split('.')[1]
  }`

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key,
    Body: fileBuffer,
    ContentType: 'image/jpg;image/png;impage/jpeg',
  }

  const command = new PutObjectCommand(params)
  await s3Client.send(command)

  return {
    fileName,
    image: `https://study-image-storage.s3.sa-east-1.amazonaws.com/${Key}`,
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'File is requiresd.', status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const { fileName, image } = await uploadFileToS3(buffer, file.name)

    return NextResponse.json({ success: true, fileName, image })
  } catch (error) {
    return NextResponse.json({ error: 'Error uploading File' })
  }
}
