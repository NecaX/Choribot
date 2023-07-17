const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('decir')
		.setDescription('Toma mi voz y hazla tuya.')
		.addStringOption(option => option.setName("texto").setDescription('Que quieres que te diga.').setRequired(true)),
	async execute(interaction) {
		texto = interaction.options.getString("texto")
		interaction.reply({content: texto, tts: true}).catch(console.error);
	},
};