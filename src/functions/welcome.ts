import { Client, TextChannel } from "discord.js";

const serverID = '767139170350792704';
const welcomeChannelID = '775549595002077184';
const userCountChannelID = '775509982636540014';

export function handleWelcomes(client: Client) {
	const guild = client.guilds.resolve(serverID)!;

	const welcomeChannel = guild.channels.resolve(welcomeChannelID)! as TextChannel;
	const userCountChannel = guild.channels.resolve(userCountChannelID)!;

	const updateUserCount = () => {
		userCountChannel.setName(`Users: ${guild.memberCount}`);
	};

	client.on('guildMemberAdd', member => {
		const welcomeMessage = `Welcome to our server ${member}, please read the rules in the rules channel! ❤️`;
		welcomeChannel.send(welcomeMessage);

		updateUserCount();
	});


	client.on('guildMemberRemove', member => {
		const farewellMessage = `${member} left the Server! 👋`;
		welcomeChannel.send(farewellMessage);

		updateUserCount();
	});
}
