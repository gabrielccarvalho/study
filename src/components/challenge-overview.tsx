'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc, DocumentData } from 'firebase/firestore'
// import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { useAuth } from '@clerk/nextjs'
import { Skeleton } from './ui/skeleton'

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyD5Cybg6fSXjbiAhrJ_frn3KC4S7QnDj3k',
  authDomain: 'study-9a623.firebaseapp.com',
  projectId: 'study-9a623',
})

const db = getFirestore(firebaseApp)

export function ChallengeOverview({ id }: { id: string }) {
  const { getToken } = useAuth()
  const [challenge, setChallenge] = useState<DocumentData>()

  useEffect(() => {
    async function signInWithClerk() {
      const firebaseToken = await getToken({ template: 'integration_firebase' })

      if (!firebaseToken) return

      // const auth = getAuth()
      // const userCredentials = await signInWithCustomToken(auth, firebaseToken)

      const docRef = doc(db, 'challenges', id)

      const result = await getDoc(docRef)

      // console.log(result.data())
      setChallenge(result.data())
      // console.log(userCredentials)
    }

    signInWithClerk()
  }, [])

  return (
    <main className="flex flex-col items-center flex-1">
      <div className="flex flex-col items-center justify-center w-full overflow-hidden max-h-96">
        {challenge ? (
          <Image
            src={challenge?.thumbnail}
            alt="challenge image"
            width={1920}
            height={1080}
          />
        ) : (
          <Skeleton className="w-full mb-2 h-96 bg-muted-foreground" />
        )}
      </div>
      {challenge ? (
        <h1 className="text-2xl font-bold">{challenge.title}</h1>
      ) : (
        <Skeleton className="w-24 h-6 mb-1 bg-muted-foreground" />
      )}
      {challenge ? (
        <span className="font-thin text-md">{challenge.description}</span>
      ) : (
        <Skeleton className="w-16 h-4 mt-1 bg-muted-foreground" />
      )}
    </main>
  )
}
