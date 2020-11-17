const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Module
const welcome = require('./functions/welcome');
const _commands = require('./functions/commands');
const coleClaim = require('./functions/role-claim');
// ModuleCreateChannel
const _createchannelstreaming = require('./functions/createchannels/streaming');
const _createchannelvalorant = require('./functions/createchannels/valorant');
const _createchannelminecraft = require('./functions/createchannels/minecraft');
const _createchannelamongus = require('./functions/createchannels/amongus');
const _createchannelrocketleague = require('./functions/createchannels/rocketleague');
const _createchannellol = require('./functions/createchannels/lol');
const _createchanneljustchatting = require('./functions/createchannels/justchatting');
const _createchannelvip = require('./functions/createchannels/vip');
const _createchannelother = require('./functions/createchannels/other');

// Start Bot and load Modules
client.once('ready', () => {
    console.log('FoxBot is online!');

    welcome(client);
    _commands(client);
    coleClaim(client);
    _createchannelstreaming(client);
    _createchannelvalorant(client);
    _createchannelminecraft(client);
    _createchannelamongus(client);
    _createchanneljustchatting(client);
    _createchannelother(client);
    _createchannelrocketleague(client);
    _createchannellol(client);
    _createchannelvip(client);
});




client.login('***REMOVED***');
