import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

async function getAnalyticsCustom() {
  if (typeof window !== 'undefined') {
    const support = await isSupported()
    return support ? getAnalytics(app) : null
  }
  return null
}

// https://firebase.google.com/docs/analytics/get-started?platform=web&hl=zh-cn
export const analytics = getAnalyticsCustom()

// https://firebase.google.com/docs/firestore/quickstart?authuser=0#web-modular-api
export const db = getFirestore(app)

// https://firebase.google.com/docs/auth/web/start?authuser=0
export const auth = getAuth(app)

export default app
