import { Message } from "discord.js";
import { adminRoleName } from "./config";

export function delay(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function checkForAdminRights(message: Message): boolean {
	if (message.member === null) return false;
	return message.member.roles.cache.some(role => role.name === adminRoleName);
}
