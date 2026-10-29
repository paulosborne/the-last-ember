import { useEffect } from 'react'

type PageTitleProps = {
  title: string
  description?: string
}

export function PageTitle({ title, description }: PageTitleProps) {
  useEffect(() => {
    document.title = `${title} | The Last Ember`

    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }
  }, [description, title])

  return null
}
