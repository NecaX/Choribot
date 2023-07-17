const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('zorrito')
		.setDescription('Envia una imagen de un zorrito aleatorio.'),
	async execute(interaction) {
    fetch('https://randomfox.ca/floof/', {
      method: 'GET',
    }).then(response => response.json())
      .then(json=>{
        console.log(json.image)
        return interaction.reply({ content: 'Aqui tienes tu zorrito!', files: [json.image] });
      })
	},
};