import { Message } from "discord.js";

export async function execute(message: Message, args: string[]) {
    if (message.channel.id !== '775514641207525376') return;

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
