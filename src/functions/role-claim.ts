import { Client, GuildEmoji, GuildMember, Message, MessageEmbed, Role, TextChannel } from "discord.js";
import { delay } from "../common";
import { channelIDs, serverID } from "../config";

class RoleGroup {
	constructor(
		readonly title: string,
		readonly entries: RawRoleEntry[],
	) { }

	static raw(title: string, entries: [string, string][]): RoleGroup {
		return new RoleGroup(title, entries.map(([emoji, role]) => new AbstractRoleEntry(emoji, role)));
	}
}

class AbstractRoleEntry<E, R> {
	constructor(
		readonly emoji: E,
		readonly role: R,
	) { }
}

type RawRoleEntry = AbstractRoleEntry<string, string>;
type RoleEntry = AbstractRoleEntry<GuildEmoji, Role>;

const emojis: RoleGroup[] = [
	RoleGroup.raw("Games", [
		['Minecraft', 'Minecraft'],
		['Valorant', 'Valorant'],
		['AmongUs', 'Among Us'],
		['rocketleague', 'Rocket League'],
		['leagueoflegends', 'League of Legends'],
	]),
	RoleGroup.raw("Gender", [
		['Maennlich', 'Male'],
		['Weiblich', 'Female'],
		['Divers', 'Divers'],
	]),
	RoleGroup.raw("Sexuality", [
		['gay', 'Gay'],
	]),
	RoleGroup.raw("Age", [
		['FSK12', 'FSK 12'],
		['FSK16', 'FSK 16'],
		['FSK18', 'FSK 18'],
		['FSK21', 'FSK 21'],
	]),
	RoleGroup.raw("Miscellaneous", [
		['Twitch', 'Streamer'],
	]),
];

export async function handleRoleClaims(client: Client) {
	const guild = client.guilds.resolve(serverID)!;
	const roleClaimChannel = guild.channels.resolve(channelIDs.roleClaim) as TextChannel;

	const resolvedEntries: RoleEntry[][] = emojis.map(group =>
		group.entries.map(raw => new AbstractRoleEntry(
			guild.emojis.cache.find(emoji => emoji.name === raw.emoji)!,
			guild.roles.cache.find(role => role.name === raw.role)!,
		))
	);

	ensureNthMessage(roleClaimChannel, 1, "Use the reactions on these messages to opt into and out of roles.");

	for (const groupIndex of emojis.keys()) {
		const groupEntries = resolvedEntries[groupIndex];
		const optionsText = groupEntries
			.map(roleEntry => `${roleEntry.emoji} = ${roleEntry.role.name}`)
			.join("\n");
		const embed = new MessageEmbed();
		embed.setTitle(emojis[groupIndex].title);
		embed.setDescription(optionsText);

		// async
		ensureNthMessage(
			roleClaimChannel,
			groupIndex + 2, embed,
			groupEntries.map(x => x.emoji)
		);
		await delay(100);
	}

	const flatEntries = Array<RoleEntry>().concat(...resolvedEntries);

	function registerHandler(
		event: string,
		callback: (member: GuildMember, role: Role) => void
	) {
		client.on(event, (reaction, user) => {
			if (reaction.message.channel.id !== channelIDs.roleClaim) return;
			if (user.bot) return;

			const emoji = reaction.emoji.id;

			const guild = reaction.message.guild!;
			const roleEntry = flatEntries.find(entry => entry.emoji.id === emoji);
			if (roleEntry === undefined) return;

			const member = guild.members.resolve(user.id)!;
			callback(member, roleEntry.role);
		});
	}

	registerHandler('messageReactionAdd', (member, role) => member.roles.add(role));
	registerHandler('messageReactionRemove', (member, role) => member.roles.remove(role));
}

/**
 * 1-based, i.e. n = 1 means the first message
 */
async function ensureNthMessage(
	channel: TextChannel,
	n: number, message: string | MessageEmbed,
	reactions: GuildEmoji[] = []
) {
	const messages = await channel.messages.fetch();
	let sentMessage: Message;

	if (messages.size < n) {
		sentMessage = await channel.send(message);
	} else {
		sentMessage = messages.array()[messages.size - n];
		sentMessage.edit(message);
	}

	const existingReactions = sentMessage.reactions.cache.array();
	// find first index where existing reaction doesn't match desired ones
	let nonMatchingStart = existingReactions
		.findIndex((existing, index) => existing.emoji !== reactions[index]);
	if (nonMatchingStart < 0) {
		nonMatchingStart = existingReactions.length;
	}

	// remove non-matching existing reactions
	const toRemove = existingReactions.slice(nonMatchingStart);
	for (const existing of toRemove) {
		await existing.remove();
		await delay(500);
	}

	const toAdd = reactions.slice(nonMatchingStart);
	for (const reaction of toAdd) {
		await sentMessage.react(reaction);
		await delay(500);
	}
}
