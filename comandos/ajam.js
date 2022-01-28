const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ajam')
		.setDescription('Pues eso.'),
	async execute(interaction) {
		return interaction.reply({files: ['https://media1.tenor.com/images/47868dea26e2a1a71dab795bf19fcb94/tenor.gif?itemid=8176035']});
	},
};