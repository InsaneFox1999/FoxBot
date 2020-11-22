import { Client } from 'discord.js';
import * as fs from 'fs-extra';
import * as path from 'path';

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

function writeLogFile<T>(prefix: string, contents: T) {
	fs.ensureDirSync("log");
	const errorFile = path.join("log", `${prefix}-${new Date().toISOString()}.json`);
	fs.writeJSONSync(errorFile, contents);
}

process.on('unhandledRejection', (error, _promise) => {
	console.log("unhandled rejection! D:");
	console.dir(error);
	writeLogFile('unhandledRejection', error);
});

process.on('uncaughtException', (error) => {
	console.log("uncaught exception! D:");
	console.dir(error);
	writeLogFile('uncaughtException', {
		error, errorString: error.toString(), stack: error.stack
	});
});
