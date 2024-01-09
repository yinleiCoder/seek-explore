'use server'
import { AuthError } from 'next-auth'
import bcrypt from 'bcryptjs'
// server action
import { signIn, signOut } from './auth'
import { connectDB } from './db'
import { User } from '@/models/user'

export const handleGithubLogin = async () => {
  await signIn('github')
}

export const handleLogout = async () => {
  await signOut()
}

export const register = async (previousState: any, formData: FormData) => {
  const { username, email, password, passwordRepeat } = Object.fromEntries(formData.entries())
  if (password !== passwordRepeat) {
    return { error: '两次输入的密码不匹配' }
  }
  try {
    connectDB()
    const user = await User.findOne({ username })
    if (user) {
      return { error: '该用户已存在' }
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password as string, salt)
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar_url: '/images/userAvatar.png',
    })
    await newUser.save()
    return { success: true }
  } catch (err) {
    console.error(err)
    return { error: '注册新用户出错了，请检查用户名和密码！' }
  }
}

export const login = async (previousState: any, formData: FormData) => {
  const { username, password } = Object.fromEntries(formData.entries())
  try {
    await signIn('credentials', { username, password })
    return { success: true }
  } catch (err) {
    console.error(err)
    if (err instanceof AuthError) {
      switch (err.type) {
        case 'CredentialsSignin':
          return { error: '用户或密码错误' }
        default:
          return { error: '发生了其他错误，请查看错误平台日志！' }
      }
    }
    throw err
  }
}
