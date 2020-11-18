import { Client, Message } from 'discord.js';
import fs = require('fs');

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

const prefix = '!';

export function loadCommands(client: Client) {
    client.on('message', message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).split(/ +/);
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
