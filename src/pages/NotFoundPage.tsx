import { Link } from 'react-router'
import { PageTitle } from '../components/PageTitle'

export function NotFoundPage() {
  return <section className="not-found" aria-labelledby="not-found-title"><PageTitle title="Page not found" /><p className="eyebrow">Lost beyond the frontier</p><h1 id="not-found-title">This path leads nowhere yet.</h1><p>The page you were looking for is not part of Longkeep.</p><Link className="button" to="/">Return to the fire</Link></section>
}
