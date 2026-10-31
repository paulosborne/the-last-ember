import react from '@vitejs/plugin-react'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { defineConfig } from 'vite'
import { parsePublishedChronicles } from './src/content/chronicle-validation.js'

const virtualChroniclesId = 'virtual:published-chronicles'
const resolvedVirtualChroniclesId = `\0${virtualChroniclesId}`

function readPublishedChronicles() {
  const root = resolve(process.cwd(), 'content/chronicles/published')
  const sources = existsSync(root) ? readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => ({ filename: basename(entry.name), raw: readFileSync(resolve(root, entry.name), 'utf8') })) : []
  return parsePublishedChronicles(sources, { assetExists: (src) => existsSync(resolve(process.cwd(), 'public', src.slice(1))) })
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'validate-published-chronicles',
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
  ],
  server: { proxy: { '/api': 'http://127.0.0.1:3000' } },
})
