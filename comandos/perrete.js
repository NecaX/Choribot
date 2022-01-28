const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('perrete')
		.setDescription('Envia una imagen de un perrete aleatorio.'),
	async execute(interaction) {
    fetch('https://dog.ceo/api/breeds/image/random', {
      method: 'GET',
    }).then(response => response.json())
      .then(json=>{
        return interaction.reply({ content: 'Aqui tienes tu perrete!', files: [json.message] });
      })
	},
};