const Discord = require('discord.js');
const { on } = require('process');

const channelIDs = ['776461040254713856', '776461062756892722', '776461088728154172'];

module.exports = {
    name: 'game',
    description: 'game',
    async execute(message, args) {
        if (!channelIDs.includes(message.channel.id)) return;

        const member = message.guild.member(message.author);

        if (!member.voice) {
            await message.channel.send(`❌ ${member} you are not currently in a voice channel >:(`);
            return;
        }

        await message.delete();

        const voiceChannel = member.voice.channel;
        if (!voiceChannel.parent) return;
        const gameName = voiceChannel.parent.name;
        if (gameName === "Support" || gameName === "Away From Keyboard") return;
        const invite = await voiceChannel.createInvite({ maxAge: 86400 });

        const _UsersNickName = member.nickname;
        if (!_UsersNickName) {
            const reply = `_\n_ [${gameName}] Join the room in ${invite.url}`;
            await message.channel.send(reply);
        } else {
            const reply = `_\n_ [${gameName}] Join ${_UsersNickName} in ${invite.url}`;
            await message.channel.send(reply);
        }
    

        return;
    }
}