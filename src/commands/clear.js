module.exports = {
    name: 'clear',
    description: 'clear textchannel',
    async execute(message, args) {
        // Checkt ob Rank vorhanden
        const isAdmin = message.member.roles.cache.some(role => role.name === "Administrator");
        if (!isAdmin) return;

        const count = Math.min(parseInt(args.shift()) || 100, 100);

        // Löscht Nachricht (Max. 100 per Bot)
        await message.delete();
        await message.channel.bulkDelete(count);
    }
}
