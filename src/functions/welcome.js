let stats = {
    serverID: '767139170350792704',
    totalUser: '775509982636540014'
}


module.exports = client => {
    client.on('guildMemberAdd', member => {
    const channelID = '775549595002077184';

    //Welcome Message
    const message = `Welcome to our server ${member}, please read the rules in the rules channel! ❤️`;
    const channel = member.guild.channels.cache.get(channelID);
    channel.send(message);


    //Stats
    client.channels.cache.get(stats.totalUser).setName(`Users: ${member.guild.memberCount}`);


});


client.on('guildMemberRemove', member => {

    const channelID = '775549595002077184';
    const channel = member.guild.channels.cache.get(channelID);

    // Stats
    client.channels.cache.get(stats.totalUser).setName(`Users: ${member.guild.memberCount}`);
    
    const message = `${member} left the Server! 👋`;
    channel.send(message);
    
});

}
