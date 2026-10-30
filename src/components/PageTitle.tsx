import { useEffect } from 'react'

type PageTitleProps = {
  title: string
  description?: string
}

const defaultDescription = 'The Last Ember is a relaxed, cooperative Enshrouded community building a home together in Longkeep.'

export function PageTitle({ title, description }: PageTitleProps) {
  useEffect(() => {
    document.title = `${title} | The Last Ember`

    document.querySelector('meta[name="description"]')?.setAttribute('content', description ?? defaultDescription)
  }, [description, title])

  return null
}
