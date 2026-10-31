export function isSafeLink(href: string | undefined): boolean {
  if (!href) return false
  if (/^(?:\/|\\){2}/.test(href)) return false
  if (href.startsWith('/')) return true
  if (href.startsWith('#')) return true
  try {
    const url = new URL(href, 'https://chronicles.invalid')
    if (url.origin === 'https://chronicles.invalid') return true

    const protocol = url.protocol
    return protocol === 'https:' || protocol === 'http:' || protocol === 'mailto:'
  } catch {
    return false
  }
}
