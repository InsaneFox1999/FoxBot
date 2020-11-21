import { Client } from 'discord.js';

import { token } from './config';
import { handleWelcomes } from './functions/welcome';
import { loadCommands } from './functions/commands';
import { handleVoiceChannels } from './functions/voice';
import { handleRoleClaims } from './functions/role-claim';

const client = new Client();
client.login(token);

client.on('ready', () => {
	console.log('FoxBot is online!');

	handleWelcomes(client);
	loadCommands(client);
	handleRoleClaims(client);
	handleVoiceChannels(client);
});
