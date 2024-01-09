import {
  Body,
  Container,
  Column,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
  Button,
} from '@react-email/components'
import * as React from 'react'

interface EmailTemplateProps {
  userName: string
}

const baseUrl = 'https://yinlei.pro'

export const EmailTemplate = ({ userName }: EmailTemplateProps) => (
  <Html>
    <Preview>寻寻觅觅(四川公考助手) 四川公考公告更新</Preview>
    <Tailwind>
      <Body>
        <Container>
          <Section>
            <Row>
              <Column>
                <Img
                  src={`${baseUrl}/images/author.jpg`}
                  width="50"
                  height="50"
                  className="rounded-full border-2 border-black"
                  alt="Author"
                />
              </Column>
              <Column>
                <Heading>寻寻觅觅</Heading>
              </Column>
            </Row>
          </Section>
          <Section>
            <Hr />
            <Heading as="h2">最新动态</Heading>
            <Text>亲爱的{userName}用户，四川事业单位、公务员公告信息已经更新！</Text>
            <Text>
              <Button
                href={`${baseUrl}/news`}
                className="bg-indigo-500 px-2 py-1 rounded-md text-white"
              >
                点击查看消息原文
              </Button>
              ,本网站已汇总四川各地市级的招录公告，希望对您有所帮助，祝您早日考上心仪的岗位😄
            </Text>
          </Section>
          <Section>
            <Text className="text-sm text-gray-400">
              更多内容尽在
              <Link href={`${baseUrl}`} className="underline">
                yinlei.pro
              </Link>
              ，本站提供了公考时间倒计时和消息卡片等功能，若您有功能需求，可在官网上给尹磊留言，谢谢您的参与。
            </Text>
            <Hr />
          </Section>
          <Section>
            <Heading as="h2">感谢您的订阅</Heading>
            <Heading as="h3">联系方式</Heading>
            <Text>联系人：尹磊</Text>
            <Text>微信：yl1099129793</Text>
            <Text>手机号码：13795950539</Text>
          </Section>
          <Section>
            <Img
              src={`https://images.pexels.com/photos/17729739/pexels-photo-17729739.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`}
              className="w-full aspect-video object-cover rounded-md"
              alt="yinlei.pro"
            />
            <Text>© 2024 yinlei MianYang, SiChuan, China</Text>
            <Text className="text-sm text-gray-400">
              如有打扰，退订请联系作者邮箱1099129793@qq.com或yl1099129793@gmail.com，谢谢您的支持与理解
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

export default EmailTemplate
