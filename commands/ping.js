module.exports = {
    name: 'ping',
    description: 'this is a ping command',
    execute(message, args){
        if (message.channel.id === '775549595002077184') {
            message.channel.send('pong!');
        }

    }
}