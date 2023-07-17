const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gatete')
		.setDescription('Envia una imagen de un gatete aleatorio.'),
	async execute(interaction) {
    fetch('https://api.thecatapi.com/v1/images/search', {
      method: 'GET',
      headers: {
        'x-api-key': '6efc7324-7195-4db1-accc-328020dd0e8f'
      }
    }).then(response => response.json())
      .then(json=>{
        return interaction.reply({ content: 'Aqui tienes tu gatete!', files: [json[0].url] });
      })
	},
};