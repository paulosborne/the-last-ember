import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { community } from '../config/community'

const navigation = [
  { to: '/', label: 'Home', end: true },
  { to: '/village', label: 'Village' },
  { to: '/villagers', label: 'Villagers' },
  { to: '/chronicles', label: 'Chronicle' },
]

export function SiteHeader() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)

  function closeNavigation() {
    setIsNavigationOpen(false)
  }

  return (
    <header className={`site-header ${isHome ? 'site-header--overlay' : ''}`}>
      <Link className="wordmark" to="/" aria-label="The Last Ember home" onClick={closeNavigation}><span>The Last</span> Ember</Link>
      <button className="navigation-toggle" type="button" aria-expanded={isNavigationOpen} aria-controls="primary-navigation" onClick={() => setIsNavigationOpen((open) => !open)}>
        <span className="sr-only">{isNavigationOpen ? 'Close' : 'Open'} navigation</span>
        <span aria-hidden="true">{isNavigationOpen ? 'Close' : 'Menu'}</span>
      </button>
      <nav id="primary-navigation" className={isNavigationOpen ? 'is-open' : ''} aria-label="Primary navigation">
        <ul>
          {navigation.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.end} onClick={closeNavigation} className={({ isActive }) => isActive ? 'is-active' : undefined}>{item.label}</NavLink>
            </li>
          ))}
          <li><a href={community.serverDashboardUrl} target="_blank" rel="noreferrer" onClick={closeNavigation}>Server <span className="sr-only">(opens in a new tab)</span></a></li>
        </ul>
      </nav>
      <Link className="header-join" to="/#join" onClick={closeNavigation}>Find the fire</Link>
    </header>
  )
}
