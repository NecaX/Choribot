const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('animalico')
		.setDescription('Envia una imagen de un animalico aleatorio.'),
	async execute(interaction) {
    try {
      let animalicoFunctions = [
        require(`./perrete.js`),
        require(`./gatete.js`),
        require(`./zorrito.js`),
      ]
      let randomAnimalicoFunction = animalicoFunctions[Math.floor(Math.random() * animalicoFunctions.length)]
      await randomAnimalicoFunction.execute(interaction);
    } catch (err) {
      console.error(err);
    }
	},
};