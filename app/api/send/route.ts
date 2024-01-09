import EmailTemplate from '@/components/subscribe/email'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const email = await request.json()
    const data = await resend.emails.send({
      from: '寻寻觅觅 <subscribe@yinlei.pro>',
      to: [email],
      subject: '订阅重要消息',
      react: EmailTemplate({ userName: email }),
    })
    return Response.json(data)
  } catch (error) {
    return Response.json({ error })
  }
}
