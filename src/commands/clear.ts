import { Message } from "discord.js";
import { checkForAdminRights } from "../common";

export async function execute(message: Message, args: string[]) {
	if (!checkForAdminRights(message)) return;

	const countArg = args.shift();
	if (countArg === undefined) {
		message.channel.send("😕 Usage: !clear <1-100> 🤦");
		return;
	}
	const count = Math.min(parseInt(countArg, 10) ?? 1, 100);

	if (message.channel.type !== "text") return;

	await message.delete();
	await message.channel.bulkDelete(count);
}
