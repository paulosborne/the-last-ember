import type { ComponentProps } from 'react'
import ReactMarkdown from 'react-markdown'
import { isSafeLink } from '../content/markdown-safety'

type MarkdownArticleBodyProps = {
  children: string
}

function SafeLink({ href, children }: ComponentProps<'a'>) {
  if (!isSafeLink(href)) return <>{children}</>
  return <a href={href}>{children}</a>
}

export function MarkdownArticleBody({ children }: MarkdownArticleBodyProps) {
  return <div className="article-body"><ReactMarkdown components={{ a: SafeLink, img: () => null }}>{children}</ReactMarkdown></div>
}
