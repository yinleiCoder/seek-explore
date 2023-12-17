import admin, { ServiceAccount } from 'firebase-admin'
import serviceAccount from './note-draft-firebase-adminsdk-rfsbe-0e357613e4.json'
import { getAuth } from 'firebase-admin/auth'
import { getApps } from 'firebase-admin/app'

const ADMIN_APP_NAME = 'note-draft'
const adminApp =
  getApps().find(it => it.name === ADMIN_APP_NAME) ||
  admin.initializeApp(
    {
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    },
    ADMIN_APP_NAME
  )

export const adminAuth = getAuth(adminApp)

export default admin
