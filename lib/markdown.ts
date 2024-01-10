import { remark } from 'remark'
import strip from 'strip-markdown'

// 清除掉所有markdown语法格式，这样节省token交给腾讯语音合成
export const stripMarkdown = async (markdownText: string) => {
  const file = await remark().use(strip).process(markdownText)
  return String(file)
}
