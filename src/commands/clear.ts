import { Message } from "discord.js";

export async function execute(message: Message, args: string[]) {
	// Checkt ob Rank vorhanden
	if (message.member === null) return;
	const isAdmin = message.member.roles.cache.some(role => role.name === "Administrator");
	if (!isAdmin) return;

	const countArg = args.shift();
	if (countArg === undefined) {
		message.channel.send("😕 Usage: !clear <1-100> 🤦");
		return;
	}
	const count = Math.min(parseInt(countArg, 10) ?? 100, 100);

	if (message.channel.type !== "text") return;

	await message.delete();
	await message.channel.bulkDelete(count);
}
