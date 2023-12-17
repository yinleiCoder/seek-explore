import { clearUrl } from '@/lib/clearUrl'
import admin, { adminAuth } from '@/lib/firebase/firebaseAdmin'
import redis from '@/lib/redis'
import { Comment } from '@/types/comment'
import { User } from '@/types/user'
import { auth } from 'firebase-admin'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export const dynamic = 'force-dynamic' // defaults to auto

// 获取全部评论(后期考虑评论过多的话就分页处理+swr+react visuallist)
export async function GET(request: NextRequest) {
  const postSlug = clearUrl(request.headers.get('referer') as string)
  try {
    if (!redis) {
      return NextResponse.json(
        {
          message: '亲，评论系统和Redis客户端暂时失联了~',
        },
        { status: 500 }
      )
    }
    const rawComments = await redis.lrange(postSlug, 0, -1)
    const comments = rawComments.map(c => {
      const comment: Comment = JSON.parse(c)
      return comment
    })
    return NextResponse.json(comments)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

interface RequestBodyProps {
  text: string
  user: User
}

// 新建评论
export async function POST(request: NextRequest) {
  try {
    const postSlug = clearUrl(request.headers.get('referer') as string)
    const { text, user } = (await request.json()) as RequestBodyProps
    if (!user || !user.uid) {
      return NextResponse.json(
        {
          message: '亲，要先登录哦~',
        },
        { status: 500 }
      )
    }
    if (!text) {
      return NextResponse.json(
        {
          message: '亲，提交评论要写内容哦~',
        },
        { status: 500 }
      )
    }
    if (!redis) {
      return NextResponse.json(
        {
          message: '亲，本次评论和Redis客户端失联了~',
        },
        { status: 500 }
      )
    }

    // // // 获取并验证用户信息通过firebase, 从请求头获取google auth token
    // const idToken = request.headers.get('Authorization') as string
    // // https://firebase.google.com/docs/auth/admin/verify-id-tokens?hl=zh-cn#web
    // // 先申请firebase admin sdk,再通过其验证token
    // let decodedToken
    // try {
    //     decodedToken = await adminAuth.verifyIdToken(idToken)
    // } catch (err) {
    //     console.error(err)
    //     return NextResponse.json(
    //         {
    //             message: err,
    //         },
    //         { status: 500 }
    //     )
    // }
    // const uid = decodedToken.uid
    // const user = await adminAuth.getUser(uid)
    const comment: Comment = {
      id: uuidv4(),
      created_at: Date.now(),
      post_slug: postSlug,
      text,
      user,
    }

    // ioredis写入评论到redis数据库
    await redis?.lpush(postSlug, JSON.stringify(comment))
    return NextResponse.json({ comment })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

// 删除评论
export async function DELETE(request: NextRequest) {}
