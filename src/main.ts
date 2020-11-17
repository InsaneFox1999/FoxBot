import Discord = require('discord.js');
const client = new Discord.Client();

/*
import fs = require('fs');
//client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    //client.commands.set(command.name, command);
}
*/

// Module
import welcome = require('./functions/welcome');
import _commands = require('./functions/commands');
import coleClaim = require('./functions/role-claim');
// ModuleCreateChannel
import _createchannelstreaming = require('./functions/createchannels/streaming');
import _createchannelvalorant = require('./functions/createchannels/valorant');
import _createchannelminecraft = require('./functions/createchannels/minecraft');
import _createchannelamongus = require('./functions/createchannels/amongus');
import _createchannelrocketleague = require('./functions/createchannels/rocketleague');
import _createchannellol = require('./functions/createchannels/lol');
import _createchanneljustchatting = require('./functions/createchannels/justchatting');
import _createchannelvip = require('./functions/createchannels/vip');
import _createchannelother = require('./functions/createchannels/other');

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
