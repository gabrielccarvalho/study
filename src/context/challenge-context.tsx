'use client'

import { firebaseApp } from '@/lib/firebase-config'
import {
  DocumentData,
  collection,
  getDocs,
  getFirestore,
} from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'

const ChallengeContext = createContext({
  challenges: [] as (DocumentData | undefined)[],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // update: () => {},
})

const db = getFirestore(firebaseApp)

export function ChallengeProvider({ children }: { children: React.ReactNode }) {
  const [challenges, setChallenges] = useState<DocumentData[]>([])

  useEffect(() => {
    async function signInWithClerk() {
      const snapshot = await getDocs(collection(db, 'challenges'))
      snapshot.docs.map((doc) => setChallenges([{ id: doc.id, ...doc.data() }]))
    }

    signInWithClerk()
  }, [])

  return (
    <ChallengeContext.Provider value={{ challenges }}>
      {children}
    </ChallengeContext.Provider>
  )
}

export function useChallenge() {
  const { challenges } = useContext(ChallengeContext)

  return {
    challenges,
  }
}
