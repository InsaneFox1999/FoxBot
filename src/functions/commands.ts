import { Client, Message } from 'discord.js';
import fs = require('fs');

import { commandPrefix } from '../config';

type Command = (message: Message, args: string[]) => void;
const commands: Map<string, Command> = new Map();

const commandsFolder = `${__dirname}/../commands`;
const commandFiles = fs.readdirSync(commandsFolder)
	.filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`${commandsFolder}/${file}`);
	const commandName = file.slice(0, -3);
	commands.set(commandName, command.execute);
}

export function loadCommands(client: Client) {
	client.on('message', message => {
		if (!message.content.startsWith(commandPrefix) || message.author.bot) return;

		const args = message.content.slice(commandPrefix.length).split(/ +/);
		const commandName = args.shift();
		if (commandName === undefined) return;
		const command = commands.get(commandName.toLowerCase());
		if (command === undefined) return;
		try {
			command(message, args);
		} catch (error) {
			console.log(`error executing command for message '${message}'`);
			console.log(error);
		}
	});
}
