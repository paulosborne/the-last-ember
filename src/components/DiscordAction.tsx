import { community } from '../config/community'

type DiscordActionProps = {
  className?: string
}

export function DiscordAction({ className = '' }: DiscordActionProps) {
  if (!community.discordInviteUrl) {
    return <span className={`button button-unavailable ${className}`} role="status">Discord invitation coming soon</span>
  }

  return <a className={`button ${className}`} href={community.discordInviteUrl}>Join us on Discord</a>
}
