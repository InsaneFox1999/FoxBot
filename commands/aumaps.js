const Discord = require('discord.js');

module.exports = {
    name: 'aumaps',
    description: 'aumaps',
    async execute(message, args, thenumber) {

        if (message.channel.id !== '775514641207525376') return;


        if (!thenumber) {
            await message.channel.send("😕 Usage: !aumaps <1-3> 🤦");
            return;
        }

        if (thenumber === "1") {
            message.channel.send('http://mefox.de/1.png');

        } else if (thenumber === "2")  {
            message.channel.send('http://mefox.de/2.png');

        } else if (thenumber === "3")  {
            message.channel.send('http://mefox.de/3.png');

        } else {
            
            await message.channel.send("😕 Usage: !aumaps <1-3> 🤦");
            return;

        }
    }
}