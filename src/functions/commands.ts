import { Client, Message } from 'discord.js';
import fs = require('fs');
const commands: { [name: string]: (message: Message, args: string[]) => void } = {};

const commandsFolder = `${__dirname}/../commands`;
const commandFiles = fs.readdirSync(commandsFolder)
    .filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`${commandsFolder}/${file}`);
    console.log(command);
    commands[command.name] = command.execute;
}

const prefix = '!';

export function loadCommands(client: Client) {
    client.on('message', message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift();
        if (commandName === undefined) return;
        const command = commands[commandName.toLowerCase()];
        if (command === undefined) return;
        command(message, args);
    });
}
