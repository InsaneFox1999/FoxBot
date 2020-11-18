import { Message } from "discord.js";

const channelIDs = [
	'776461040254713856', // #normal-search
	'776461062756892722', // #team-search
	'776461088728154172', // #other
];

export async function execute(message: Message, args: string[]) {
	if (!channelIDs.includes(message.channel.id)) return;

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
