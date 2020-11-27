import { Message } from "discord.js";
import { checkForAdminRights, sendLogMessage } from "../common";
import { channelIDs } from "../config";

export async function execute(message: Message, args: string[]) {
	if (!checkForAdminRights(message)) return;
	if (message.channel.id === channelIDs.botLog) {
		sendLogMessage(`nice try 🙄`);
		return;
	}

	const countArg = args.shift();
	if (countArg === undefined) {
		message.channel.send("😕 Usage: !clear <1-100> 🤦");
		return;
	}
	const count = Math.min(parseInt(countArg, 10) ?? 1, 100);

	if (message.channel.type !== "text") return;

	try {
		await message.delete();
		await message.channel.bulkDelete(count);
	} catch (error) {
		console.log(`failed to delete messages for clear command ${message}`);
		console.dir(error);
	}
}
