import { User as UserModel } from '@/models/user'
import { User } from '@/types/user'
import mongoose, { ConnectionStates } from 'mongoose'
import { unstable_noStore as noStore } from 'next/cache'

type ConnectionProps = {
  isConnected: ConnectionStates
}

const connection: ConnectionProps = { isConnected: ConnectionStates.disconnected }

export const connectDB = async () => {
  try {
    if (connection.isConnected === ConnectionStates.connected) {
      console.log('Reusing existing connection!')
      return
    }
    const db = await mongoose.connect(process.env.MONGODB_CLOUD!)
    connection.isConnected = db.connections[0].readyState
  } catch (error) {
    console.error(error)
    throw new Error('Error when connect mongodb cloud!')
  }
}

export const getUser = async (uid: string) => {
  noStore()
  try {
    connectDB()
    const user = await UserModel.findById(uid)
    return user
  } catch (err) {
    console.error(err)
    throw new Error('Failed to fetch user!')
  }
}

export const getUsers = async () => {
  noStore()
  try {
    connectDB()
    const users = await UserModel.find()
    return users
  } catch (err) {
    console.error(err)
    throw new Error('Failed to fetch all users!')
  }
}
