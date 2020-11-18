import { Message } from "discord.js";

export async function execute(message: Message, args: string[]) {
    if (message.channel.id === '775549595002077184') {
        message.channel.send('pong!');
    }
}
