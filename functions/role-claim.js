const firstMessage = require('./firstmessage');

module.exports = client => {
    const channelId = '767140016676798524';

    const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName);

    const emojis = {
        Minecraft: 'Minecraft',
        Valorant: 'Valorant',
        AmongUs: 'Among Us',
        rocketleague: 'Rocket League',
        leagueoflegends: 'League of Legends',
        Maennlich: 'Male',
        Weiblich: 'Female',
        Divers: 'Divers',
        FSK12: 'FSK 12',
        FSK16: 'FSK 16',
        FSK18: 'FSK 18',
        FSK21: 'FSK 21',
        Twitch: 'Streamer',
        gay: 'Gay'
    }


    const reactions = []


    let emojiText = 'Use the reactions on this message to opt-in and out of roles.\n\n'
    
    for (const key in emojis) {
        const emoji = getEmoji(key)
            
            reactions.push(emoji)
        
            const role = emojis[key]
            emojiText += `${emoji} = ${role}\n`

      }

      emojiText += `\n \n \n`

    firstMessage(client, channelId, emojiText, reactions);

    const handleReaction = (reaction, user, add) => {
        if (user.id === '775516814162788352') {
            return
        }

        const emoji = reaction._emoji.name

        const { guild } = reaction.message
        const roleName = emojis[emoji]

        if  (!roleName) {
            return
        }

        const role = guild.roles.cache.find(role => role.name === roleName)
        const member = guild.members.cache.find(member => member.id === user.id)

        if (add) {
            member.roles.add(role)
        } else {
            member.roles.remove(role)
        }
    }

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channelId) {
            handleReaction(reaction, user, true);
        }
    });

    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channelId) {
            handleReaction(reaction, user, false);
        }
    });
}