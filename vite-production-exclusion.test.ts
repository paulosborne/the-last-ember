import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { build } from 'vite'
import { afterAll, describe, expect, it } from 'vitest'

const outputDirectory = await mkdtemp(join(tmpdir(), 'the-last-ember-production-build-'))

async function outputText(directory: string): Promise<string> {
  const entries = await readdir(directory, { withFileTypes: true })
  const contents = await Promise.all(entries.map(async (entry) => entry.isDirectory()
    ? outputText(join(directory, entry.name))
    : readFile(join(directory, entry.name), 'utf8')))
  return contents.join('\n')
}

afterAll(async () => {
  await rm(outputDirectory, { recursive: true, force: true })
})

describe('production Chronicle bundle', () => {
  it('does not register the preview route or ship draft fixture text', async () => {
    await build({
      configFile: resolve(process.cwd(), 'vite.config.ts'),
      build: { emptyOutDir: true, outDir: outputDirectory },
      logLevel: 'silent',
    })

    const bundle = await outputText(outputDirectory)
    expect(bundle).not.toContain('chronicles/preview')
    expect(bundle).not.toContain('fictional-draft-preview')
    expect(bundle).not.toContain('fictional draft material')
  })
})
