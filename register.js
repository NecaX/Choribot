const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId, guildId } = require('./config.json');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
// const clientId = '223492492551651328';
// const guildId = '294922283942674443';

for (const file of commandFiles) {
	const command = require(`./comandos/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();