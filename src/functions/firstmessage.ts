import { Client, EmojiResolvable, Message, MessageReaction, TextChannel } from "discord.js";

export default async (channel: TextChannel, text: string, reactions: EmojiResolvable[] = []) => {
    const messages = await channel.messages.fetch();

    if (messages.size === 0) {
        const message = await channel.send(text);
        addReactions(message, reactions);
    } else {
        for (const message of messages) {
            message[1].edit(text);
            addReactions(message[1], reactions);
        }
    }
};

function addReactions(message: Message, reactions: EmojiResolvable[]) {
    message.react(reactions[0]);
    reactions.shift();
    if (reactions.length > 0) {
        setTimeout(() => addReactions(message, reactions), 750);
    }
}
