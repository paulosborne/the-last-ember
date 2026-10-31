import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { ChronicleCover } from './ChronicleCover'
import { MarkdownArticleBody } from './MarkdownArticleBody'

describe('Chronicle article rendering', () => {
  it('renders Markdown without raw HTML and suppresses unsafe links', () => {
    const markup = renderToStaticMarkup(<MarkdownArticleBody>{'A <strong>literal tag</strong> and an [unsafe link](javascript:alert(1)).'}</MarkdownArticleBody>)

    expect(markup).toContain('&lt;strong&gt;literal tag&lt;/strong&gt;')
    expect(markup).toContain('unsafe link')
    expect(markup).not.toContain('href=')
  })

  it('renders an accessible cover figure and optional caption', () => {
    const markup = renderToStaticMarkup(<ChronicleCover cover={{ src: '/images/old-town-placeholder.svg', alt: 'Fictional test cover description', caption: 'Fictional caption' }} />)

    expect(markup).toContain('<figure')
    expect(markup).toContain('alt="Fictional test cover description"')
    expect(markup).toContain('<figcaption>Fictional caption</figcaption>')
  })
})
