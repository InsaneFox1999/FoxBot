import { Message } from "discord.js";
import { channelIDs } from "../config";

export async function execute(message: Message, args: string[]) {
	if (message.channel.id !== channelIDs.trashTalk) return;

	const numberArg = args.shift();
	if (numberArg !== undefined) {
		const number = parseInt(numberArg, 10);
		if (1 <= number && number <= 3) {
			message.channel.send(`http://mefox.de/${number}.png`);
			return;
		}
	}

	await message.channel.send("😕 Usage: !aumaps <1-3> 🤦");
}
