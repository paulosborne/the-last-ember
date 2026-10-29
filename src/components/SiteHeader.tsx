import { Link, NavLink, useLocation } from 'react-router'
import { community } from '../config/community'

const navigation = [
  { to: '/', label: 'Home', end: true },
  { to: '/village', label: 'Village' },
  { to: '/villagers', label: 'Villagers' },
  { to: '/chronicle', label: 'Chronicle' },
]

export function SiteHeader() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <header className={`site-header ${isHome ? 'site-header--overlay' : ''}`}>
      <Link className="wordmark" to="/" aria-label="The Last Ember home"><span>The Last</span> Ember</Link>
      <nav aria-label="Primary navigation">
        <ul>
          {navigation.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.end} className={({ isActive }) => isActive ? 'is-active' : undefined}>{item.label}</NavLink>
            </li>
          ))}
          <li><a href={community.serverDashboardUrl} target="_blank" rel="noreferrer">Server <span className="sr-only">(opens in a new tab)</span></a></li>
        </ul>
      </nav>
      <Link className="header-join" to="/#join">Find the fire</Link>
    </header>
  )
}
