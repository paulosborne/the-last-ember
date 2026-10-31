import react from '@vitejs/plugin-react'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { defineConfig } from 'vite'
import { parseDraftChronicles, parsePublishedChronicles } from './src/content/chronicle-validation.js'

const virtualChroniclesId = 'virtual:published-chronicles'
const resolvedVirtualChroniclesId = `\0${virtualChroniclesId}`
const virtualDraftChroniclesId = 'virtual:draft-chronicles'
const resolvedVirtualDraftChroniclesId = `\0${virtualDraftChroniclesId}`
const virtualPreviewRouteId = 'virtual:chronicle-preview-route'
const resolvedVirtualPreviewRouteId = `\0${virtualPreviewRouteId}`

function readPublishedChronicles() {
  const root = resolve(process.cwd(), 'content/chronicles/published')
  const sources = existsSync(root) ? readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => ({ filename: basename(entry.name), raw: readFileSync(resolve(root, entry.name), 'utf8') })) : []
  return parsePublishedChronicles(sources, { assetExists: (src) => existsSync(resolve(process.cwd(), 'public', src.slice(1))) })
}

function readDraftChronicles() {
  const root = resolve(process.cwd(), 'content/chronicles/drafts')
  const sources = existsSync(root) ? readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => ({ filename: basename(entry.name), raw: readFileSync(resolve(root, entry.name), 'utf8') })) : []
  return parseDraftChronicles(sources, { assetExists: (src) => existsSync(resolve(process.cwd(), 'public', src.slice(1))) })
}

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isDevelopment = command === 'serve'

  return {
    plugins: [
      react(),
      {
        name: 'published-chronicles',
        buildStart() {
          readPublishedChronicles()
        },
        resolveId(id) {
          return id === virtualChroniclesId ? resolvedVirtualChroniclesId : undefined
        },
        load(id) {
          if (id === resolvedVirtualChroniclesId) return `export const publishedChronicles = ${JSON.stringify(readPublishedChronicles())}`
        },
      },
      ...(isDevelopment ? [{
        name: 'draft-chronicles-development-only',
        buildStart() {
          readDraftChronicles()
        },
        resolveId(id: string) {
          return id === virtualDraftChroniclesId ? resolvedVirtualDraftChroniclesId : undefined
        },
        load(id: string) {
          if (id === resolvedVirtualDraftChroniclesId) return `export const draftChronicles = ${JSON.stringify(readDraftChronicles())}`
        },
      }] : []),
      {
        name: 'chronicle-preview-route',
        resolveId(id) {
          return id === virtualPreviewRouteId ? resolvedVirtualPreviewRouteId : undefined
        },
        load(id) {
          if (id !== resolvedVirtualPreviewRouteId) return undefined
          return isDevelopment
            ? "import { createElement } from 'react'; import { Route } from 'react-router'; import { ChroniclePreviewPage } from '/src/pages/ChroniclePreviewPage'; export const chroniclePreviewRoute = createElement(Route, { path: 'chronicles/preview/:slug', element: createElement(ChroniclePreviewPage) });"
            : 'export const chroniclePreviewRoute = null'
        },
      },
    ],
    server: { proxy: { '/api': 'http://127.0.0.1:3000' } },
  }
})
