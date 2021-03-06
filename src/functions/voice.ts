import { Client, Guild, GuildChannel, GuildMember } from "discord.js";
import { channelIDs } from "../config";

export function handleVoiceChannels(client: Client) {
	client.on("voiceStateUpdate", async (oldState, newState) => {
		const guild = newState.guild;
		const member = newState.member;
		if (member === null) return;
		const oldChannel = oldState.channel;
		const newChannel = newState.channel;

		if (oldChannel?.id === newChannel?.id) return;

		if (newChannel !== null && channelIDs.voiceChannelCreation.includes(newChannel.id)) {
			newState.setChannel(await createNewChannel(guild, member, newChannel));
		}

		if (oldChannel !== null && oldChannel.members.size === 0) {
			const creationChannels = channelIDs.voiceChannelCreation.map(id => guild.channels.resolve(id)!);
			const shouldDeleteChannel = creationChannels.some(creationChannel => true
				&& creationChannel.id !== oldChannel.id
				&& creationChannel.parentID === oldChannel.parentID
			);
			if (shouldDeleteChannel) {
				console.log(`deleting temp voice channel ${oldChannel.name} with id ${oldChannel.id}`);
				oldChannel.delete();
			}
		}
	});
}

async function createNewChannel(
	guild: Guild, member: GuildMember, creationChannel: GuildChannel
): Promise<GuildChannel> {
	const effectiveName = member.nickname ?? member.user.username;
	const newChannel = await guild.channels.create(`${effectiveName}'s Room`, {
		type: 'voice',
		parent: creationChannel.parent!,
	});
	await newChannel.overwritePermissions([
		{
			id: member.id,
			allow: ['MANAGE_CHANNELS'],
		},
		{
			id: guild.id,
			allow: ['VIEW_CHANNEL'],
		},
	]);
	console.log(`created new temp voice channel for ${effectiveName}: ${newChannel.id}`);
	return newChannel;
}
