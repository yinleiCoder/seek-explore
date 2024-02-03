import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post } from '../types/post'
import { dateDiff } from '@/utils/date'

const postsDirectory = path.join(process.cwd(), 'docs')

// 获取帖子的slugs
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

// 根据slug获取某个帖子
export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const post: Post = {}
  fields.forEach((field: string) => {
    if (field === 'slug') {
      post[field] = realSlug
    }
    if (field === 'content') {
      post[field] = content
    }
    if (typeof data[field] !== 'undefined') {
      post[field] = data[field]
    }
  })
  // 解析toc
  const tocRegularExp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g
  const headings = Array.from(content.matchAll(tocRegularExp)).map(({ groups }) => {
    const flag = groups?.flag
    const tocContent = groups?.content
    return {
      level: flag?.length == 1 ? 'one' : flag?.length == 2 ? 'two' : 'three',
      text: tocContent,
    }
  })
  const filteredHeadings = headings.filter(
    heading => !(heading.text?.includes('Contents') && heading.level == 'two')
  )
  return {
    post,
    toc: filteredHeadings,
  }
}

// 获取帖子列表
export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map(slug => getPostBySlug(slug, fields).post)
    .sort((post1, post2) => -dateDiff(post1.date ?? new Date(), post2.date ?? new Date()))
  return posts
}
