import { memo } from 'react'
import ReactMarkdown, { Options } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

// https://github.com/remarkjs/react-markdown
function Markdown({ children, ...props }: Options) {
  return (
    <ReactMarkdown
      remarkPlugins={[
        [remarkGfm],
        [remarkToc, { tight: true, maxDepth: 5, ordered: true, prefix: '' }],
      ]}
      rehypePlugins={[rehypeSlug]}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props
          const match = /language-(\w+)/.exec(className || '')
          return (
            <SyntaxHighlighter
              PreTag="div"
              language={match ? match[1] : ''}
              customStyle={{ padding: 0 }}
              style={atomDark}
              showLineNumbers
              showInlineLineNumbers
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          )
        },
      }}
      {...props}
    >
      {children}
    </ReactMarkdown>
  )
}

export default memo(Markdown)
