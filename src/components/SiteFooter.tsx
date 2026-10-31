import { community } from '../config/community'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand"><span>The Last</span> Ember</div>
      <p>An independent Enshrouded community. Not affiliated with Keen Games.</p>
      <div className="footer-links">
        {community.discordInviteUrl ? <a href={community.discordInviteUrl}>Discord</a> : <span>Discord invitation coming soon</span>}
        <a href={community.serverDashboardUrl} target="_blank" rel="noreferrer">Monitoring <span className="sr-only">(opens in a new tab)</span></a>
      </div>
    </footer>
  )
}
