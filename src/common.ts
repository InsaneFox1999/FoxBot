import { assert } from "console";
import { Client, Guild, Message, TextChannel } from "discord.js";
import { adminRoleName, channelIDs, serverID } from "./config";

export function delay(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function checkForAdminRights(message: Message): boolean {
	if (message.member === null) return false;
	return message.member.roles.cache.some(role => role.name === adminRoleName);
}

export const client = new Client();

let guild: Guild | undefined;
export async function getGuild(): Promise<Guild> {
	if (guild === undefined) {
		guild = await client.guilds.fetch(serverID)!!;
	}
	return guild;
}

let botLogChannel: TextChannel | undefined;
export async function sendLogMessage(text: string) {
	if (botLogChannel === undefined) {
		botLogChannel = (await getGuild()).channels.resolve(channelIDs.botLog) as TextChannel;
	}
	try {
		botLogChannel.send(text);
	} catch {
		// ignore
	}
}
