import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it } from 'vitest'
import { ChroniclePreviewPage } from './ChroniclePreviewPage'

function renderPreview(path: string) {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/chronicles/preview/:slug" element={<ChroniclePreviewPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Chronicle draft preview', () => {
  it('renders the development draft with the shared article cover and unpublished indicator', () => {
    const markup = renderPreview('/chronicles/preview/fictional-draft-preview')

    expect(markup).toContain('Fictional draft preview only')
    expect(markup).toContain('Unpublished draft')
    expect(markup).toContain('local development preview only')
    expect(markup).toContain('alt="A deliberately fictional placeholder illustration of Old Town."')
    expect(markup).toContain('<figcaption>Fictional placeholder cover used only by this repository draft.</figcaption>')
    expect(markup).toContain('<a href="/chronicles">safe local link</a>')
  })

  it('uses the existing not-found page for an unknown draft slug', () => {
    expect(renderPreview('/chronicles/preview/unknown-draft')).toContain('This path leads nowhere yet.')
  })
})
