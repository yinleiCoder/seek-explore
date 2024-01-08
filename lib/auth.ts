import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectDB, getUser } from './db'
import { User } from '@/models/user'

// 通过用户密码登录
const loginByCredentials = async (credentials: any) => {
  try {
    connectDB()
    const user = await User.findOne({ username: credentials.username })
    if (!user) {
      throw new Error('Wrong username!')
    }
    const isPasswordCorrect = await bcrypt.compareSync(credentials.password, user.password)
    if (!isPasswordCorrect) {
      throw new Error('Wrong password!')
    }
    return user
  } catch (err) {
    console.error(err)
    throw new Error('Failed to login by credentials!')
  }
}

// next-auth
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials, request) {
        try {
          const user = await loginByCredentials(credentials)
          return user
        } catch (error) {
          return null
        }
      },
    }),
  ],
  callbacks: {
    // 通过github登录进行的回调函数
    async signIn({ user, account, profile }) {
      if (account?.provider === 'github') {
        connectDB()
        try {
          const userFromDB = await User.findOne({ email: profile?.email })
          if (!userFromDB) {
            const newUser = new User({
              username: profile?.login,
              email: profile?.email,
              avatar_url: profile?.avatar_url,
            })
            await newUser.save()
          }
        } catch (err) {
          console.error(err)
          return false
        }
      }
      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        if (!session.user.name) {
          const user = await getUser(session.user.id)
          session.user.name = user.username
        }
      }
      return session
    },
    async jwt({ token }) {
      return token
    },
  },
})
