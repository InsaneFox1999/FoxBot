import { Client, TextChannel } from "discord.js";
import { channelIDs, serverID } from "../config";

export function handleWelcomes(client: Client) {
	const guild = client.guilds.resolve(serverID)!;

	const welcomeChannel = guild.channels.resolve(channelIDs.welcome)! as TextChannel;
	const userCountChannel = guild.channels.resolve(channelIDs.userCount)!;

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
