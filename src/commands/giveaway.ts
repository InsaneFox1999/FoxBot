import { randomInt } from "crypto";
import { Message } from "discord.js";
import { checkForAdminRights } from "../common";

export async function execute(message: Message, args: string[]) {
	if (!checkForAdminRights(message)) return;

	// > fox: hey, reagier hierauf
	// > fox: !giveaway
	// > bot: @gewinner herzlichen glückwunsch!

	const recentMessages = await message.channel.messages.fetch({ limit: 2 });
	const giveawayMessage = recentMessages.array()[1];
	const allReacters = await Promise.all(
		giveawayMessage.reactions.cache
			.map(reaction => reaction.users.fetch())
	);
	const flatReacters = allReacters.flatMap(reacters => reacters.array());
	const uniques = [...new Set(flatReacters)];

	if (uniques.length === 0) {
		message.channel.send(`Nobody reacted to the giveaway message '${giveawayMessage.content}' :c`);
		return;
	}

	const winner = uniques[randomInt(uniques.length)];
	const feedback = `Congratulations, ${winner}! You've won the giveaway, out of ${uniques.length} people :)`;
	message.channel.send(feedback);
}
