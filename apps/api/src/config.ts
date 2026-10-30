import { resolve } from 'node:path'

function required(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is required`)
  return value
}

export function getConfig() {
  return { port: Number(process.env.API_PORT ?? 3000), databasePath: resolve(process.env.DATABASE_PATH ?? './data/the-last-ember.sqlite'), sessionSecret: required('SESSION_SECRET'), discordClientId: required('DISCORD_CLIENT_ID'), discordClientSecret: required('DISCORD_CLIENT_SECRET'), discordGuildId: required('DISCORD_GUILD_ID'), discordBotToken: required('DISCORD_BOT_TOKEN') }
}
