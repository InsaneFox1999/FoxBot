const prefix = '!';

module.exports = client => {
    client.on('message', message => {
        if(!message.content.startsWith(prefix) || message.author.bot) return;
    
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
    
        const ping = client.commands.get('ping');
        const randomRedditPost = client.commands.get('funny');
        const randomMapsNumber = client.commands.get('aumaps');
        const randomGameName = client.commands.get('game');
        const clearChannels = client.commands.get('clear');

        if (command === 'ping') {
            ping.execute(message, args);
        } else if (command === 'random') {
            randomRedditPost.execute(message, args, 'memes');
        } else if (command === 'funny') {
            randomRedditPost.execute(message, args, 'funny');
        } else if (command === 'wholesome') {
            randomRedditPost.execute(message, args, 'wholesomememes');
        } else if (command === 'reddit') {
            const subreddit = args.shift();
            randomRedditPost.execute(message, args, subreddit);
        } else if (command === 'aumaps') {
            const thenumber = args.shift();
            randomMapsNumber.execute(message, args, thenumber);
        } else if (command === 'game') {
            randomGameName.execute(message, args);
        } else if (command === 'clear') {
            clearChannels.execute(message, args);
        }
    
    });
  
}