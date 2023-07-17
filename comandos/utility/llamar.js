const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('llamar')
		.setDescription('Envia mensajes sin parar a un usuario o para el envio.')
		.addUserOption(option => option.setName("destino").setDescription('El usuario al que quieres llamar.').setRequired(true)),
	async execute(interaction) {
		var destino = interaction.options.getUser("destino")

		if(typeof alarmas != 'undefined'){
			if(alarmas._idleTimeout > 0){
				return interaction.reply('Ya estás llamando a alguien')
			}
		}
		console.log(interaction.user.username)	
		alarmas = setInterval(function(){msg()},3000);
		console.log('Creada alarma '+alarmas);
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`Alarma`)
					.setLabel(`Parar de llamar a ${destino.username}`)
					.setStyle(ButtonStyle.Primary),
			);


		const response = await interaction.reply({ 
			content: 'Se va a llamar a '+destino.username, 
			components: [row] 
		});

		const collectorFilter = i => i.customId === `Alarma`;

		console.log("collectorFilter")
		try {
			const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 3_600_000 });
			clearInterval(alarmas);
			return interaction.editReply({ content: `Se ha parado de llamar al usuario`, components: [] });
		} catch (e) {
			clearInterval(alarmas);
			await interaction.editReply({ content: `Llevo demasiado tiempo....... Vamos a parar anda.`, components: [] });
		}

		
		
		

		function msg(){
			destino.send({
				files: [{
					attachment: './Datos/llamar.png',
					// attachment: 'Otros/llamar.png',
					name: 'llamar.png'
				}]
			  })
				.catch(console.error);
			// console.log('Msg enviado');
			return;
		}

		//return interaction.reply({ content: 'Pong!', ephemeral: true });
	},
};

