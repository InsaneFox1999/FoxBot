import { Message } from "discord.js";
import { channelIDs } from "../config";

export async function execute(message: Message, args: string[]) {
	if (!channelIDs.searchChannels.includes(message.channel.id)) return;

	if (message.guild === null) return;
	const member = message.guild.member(message.author)!;

	const voiceChannel = member.voice.channel;
	if (voiceChannel === null) {
		await message.channel.send(`❌ ${member} you are not currently in a voice channel >:(`);
		return;
	}

	await message.delete();

	if (voiceChannel.parent === null) return;
	const gameName = voiceChannel.parent.name;
	if (gameName === "Support" || gameName === "Away From Keyboard") return;
	const invite = await voiceChannel.createInvite({ maxAge: 86400 });

	const effectiveName = member.nickname ?? message.author.username;
	const reply = `_\n_ [${gameName}] Join ${effectiveName} in ${invite.url}`;
	await message.channel.send(reply);
}
