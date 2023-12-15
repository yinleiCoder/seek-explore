import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post } from '../types/post'
import { dateDiff } from '@/utils/date'

const postMarkdownDirectory = 'docs/'
const postsMarkdownPath = path.join(process.cwd(), postMarkdownDirectory)
const fileSuffix = '.md'

// 获取帖子元数据
export function getPostMetaData(): Post[] {
  const fileNames = fs.readdirSync(postMarkdownDirectory)
  const fileNameFiltered = fileNames.filter(file => file.endsWith(fileSuffix))
  return fileNameFiltered
    .map(fileName => {
      const fullPath = path.join(postsMarkdownPath, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf-8')
      const matterResult = matter(fileContents)
      const text = matterResult.content
      const pureText = text.replace(/\s/g, '')
      const word = pureText.length
      const duration = Math.round(word / 200)
      const data = matterResult.data
      return {
        title: data.title,
        date: data.date,
        description: data.description,
        tag: data.tag,
        slug: fileName.replace(/\.md$/, ''),
        word,
        duration,
      } as Post
    })
    .sort((a, b) => -dateDiff(a.date, b.date))
}

// 读取帖子markdown内容
export function getPostContent(slug: string): Post {
  const fullPath = path.join(postsMarkdownPath, `${slug}.md`)
  const file = fs.readFileSync(fullPath, 'utf-8')
  const matterResult = matter(file)
  const content = matterResult.content
  const pureText = content.replace(/\s/g, '')
  const word = pureText.length
  const duration = Math.round(word / 200)
  const data = matterResult.data
  return {
    title: data.title,
    date: data.date,
    description: data.description,
    tag: data.tag,
    slug,
    word,
    duration,
    content,
  } as Post
}
