import Discord = require('discord.js');
const client = new Discord.Client();

// Module
import welcome = require('./functions/welcome');
import { loadCommands } from './functions/commands';
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

client.login('***REMOVED***');

client.on('ready', () => {
    // Start Bot and load Modules
    console.log('FoxBot is online!');

    welcome(client);
    loadCommands(client);
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
