// exports.run = (client, message, args) => {
//     message.channel.send('Bot creado por NecaX. https://github.com/NecaX/Choribot').catch(console.error);
// }

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Para saber cosas sobre mi creador y mi desarrollo.'),
	async execute(interaction) {
		return interaction.reply('Bot creado por NecaX. https://github.com/NecaX/Choribot').catch(console.error);
	},
};