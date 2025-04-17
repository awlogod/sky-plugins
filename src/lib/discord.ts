import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID;
const TICKET_CATEGORY_ID = process.env.TICKET_CATEGORY_ID;

const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN!);

export async function createTicketChannel(userId: string, username: string) {
  try {
    // Cria um canal de texto na categoria de tickets
    const channel = await rest.post(Routes.guildChannels(DISCORD_GUILD_ID!), {
      body: {
        name: `ticket-${username.toLowerCase()}`,
        type: 0, // 0 = GUILD_TEXT
        parent_id: TICKET_CATEGORY_ID,
        permission_overwrites: [
          {
            id: DISCORD_GUILD_ID!, // @everyone
            type: 0,
            deny: 'VIEW_CHANNEL',
          },
          {
            id: userId,
            type: 1, // 1 = member
            allow: 'VIEW_CHANNEL',
          },
        ],
      },
    });

    return channel;
  } catch (error) {
    console.error('Erro ao criar canal de ticket:', error);
    throw error;
  }
}
