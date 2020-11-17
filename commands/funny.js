const Discord = require('discord.js');
const got = require('got');

const blacklist = [
    "porn", "gayporn", "lesbianporn", "schwulporn",
    "fucking", "sex", "fick", "ficken",
    "schwanz",
    "transgonewild", "transporn", "diaperporn",
    "twinks", "jockstraps",
    "feetpics", "feet",
    "tit", "tits", "nipple", "nipples", "boob", "boobs",
    "niger", "nigger", "nigher", "nigga", "niga", "nigar",
];

const remappings = {
    "pussy": "cat",
    "muschi": "cat",
    "penis": "mildlypenis",
    "blackcock": "chickens", "blackcocks": "chickens",
    "cock": "chickens", "cocks": "chickens",
    "furryporn": "furry",
    "cum": "milk",
    "pee": "gold", "piss": "gold",
    "shit": "chocolate",
    "anal": "chocolate",
    "puppyplay": "puppies",
    "doggy": "puppies",
    "fat": "loseit",
    "pacifiers": "babies",
    "squirting": "hydrohomies",
    "hairy": "bear",
}

module.exports = {
    name: 'funny',
    description: 'funny',
    async execute(message, args, subreddit) {
        if (message.channel.id !== '775514887370702858') return;

        if (!subreddit) {
            await message.channel.send("😕 Usage: !reddit <subreddit> 🤦");
            return;
        }

        subreddit = remappings[subreddit] || subreddit;

        if (blacklist.includes(subreddit)) {
            await message.channel.send("❌ Nice try dirty boi 😂");
            return;
        }

        for (const _attempt of Array(3)) {
            try {
                const response = await got(`https://www.reddit.com/r/${subreddit}/random/.json`);

                let content;
                try {
                    content = JSON.parse(response.body)[0].data;
                } catch (e) {
                    await message.channel.send(`❌ Subreddit not found: '${subreddit}' ❌`);
                    return;
                }

                const postData = content.children[0].data;
                const permalink = postData.permalink;
                const postUrl = `https://reddit.com${permalink}`;

                const embed = new Discord.MessageEmbed();

                const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "bmp"];
                const isImage = imageExtensions.some((extension) => postData.url.endsWith(extension));
                if (isImage) {
                    embed.setImage(postData.url);
                } else {
                    embed.setThumbnail(postData.thumbnail);
                    embed.setDescription("__ \n ⬆️ Click to view the post ⬆️ \n __");
                }

                embed.setTitle(`${postData.title}`);
                embed.setURL(`${postUrl}`);
                embed.setColor('RANDOM');
                embed.setFooter(`👍 ${postData.ups} 💬 ${postData.num_comments}`);
                await message.channel.send(embed);
                return;
            } catch (e) {
                console.log("error encountered while sending random reddit post!");
                console.log(e);
            };
        }
        await message.channel.send("😢 Making bots fail is rude! 😡");
    }
}
