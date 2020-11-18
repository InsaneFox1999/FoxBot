import { Client, GuildEmoji, GuildMember, Role, TextChannel } from "discord.js";

import firstMessage from './firstmessage';
const serverID = '767139170350792704';
const roleClaimChannelID = '767140016676798524';

const emojis: [string, string][] = [
    ['Minecraft', 'Minecraft'],
    ['Valorant', 'Valorant'],
    ['AmongUs', 'Among Us'],
    ['rocketleague', 'Rocket League'],
    ['leagueoflegends', 'League of Legends'],
    ['Maennlich', 'Male'],
    ['Weiblich', 'Female'],
    ['Divers', 'Divers'],
    ['FSK12', 'FSK 12'],
    ['FSK16', 'FSK 16'],
    ['FSK18', 'FSK 18'],
    ['FSK21', 'FSK 21'],
    ['Twitch', 'Streamer'],
    ['gay', 'Gay'],
];

export function handleRoleClaims(client: Client) {
    const guild = client.guilds.resolve(serverID)!;
    const roleClaimChannel = guild.channels.resolve(roleClaimChannelID) as TextChannel;

    type RoleEntry = { emoji: GuildEmoji, role: Role };
    const resolvedEmojis: RoleEntry[] = emojis
        .map(([emojiName, roleName]) => ({
            emoji: client.emojis.resolve(emojiName)!,
            role: guild.roles.resolve(roleName)!,
        }));
    const optionsText = resolvedEmojis
        .map(roleEntry => `${roleEntry.emoji} = ${roleEntry.role}`)
        .join("\n");
    const emojiText = `Use the reactions on this message to opt-in and out of roles.\n\n${optionsText}`;

    firstMessage(roleClaimChannel, emojiText, resolvedEmojis.map(x => x.emoji));

    function registerHandler(
        event: string,
        callback: (member: GuildMember, role: Role) => void
    ) {
        client.on(event, (reaction, user) => {
            if (reaction.message.channel.id !== roleClaimChannelID) return;
            if (user.id === '775516814162788352') return;

            const emoji = reaction.emoji.id;

            const guild = reaction.message.guild!;
            const role = resolvedEmojis.find(entry => entry.emoji.id === emoji)!.role;

            const member = guild.members.resolve(user.id)!;
            callback(member, role);
        });
    }

    registerHandler('messageReactionAdd', (member, role) => member.roles.add(role));
    registerHandler('messageReactionRemove', (member, role) => member.roles.remove(role));
}
