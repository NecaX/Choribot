// exports.run = (client, message, args) => {
// 	if(message.member.roles.cache.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna"].includes(r.name)) ) {
// 		var destino = args[0];

// 		if(destino == 'parar'){
// 			llamarp=0;
// 			message.channel.send('Se ha dejado de llamar');
// 		}else{
// 			message.channel.send('Se va a llamar a '+destino);
// 			if((client.users.cache.find(user => user.username === destino)==null) && (client.users.cache.find(user => user.username === message.mentions.users.first().username)==null)){
// 				message.channel.send('El nombre de usuario no existe').catch(console.error);
// 				return;
// 			}
// 			if(typeof alrm != 'undefined'){
// 				console.log(alrm._idleTimeout);
// 				if(alrm._idleTimeout > 0){
// 					message.channel.send('Ya se esta llamando a otro usuario').catch(console.error);
// 					return;
// 				}
// 			}
// 			llamarp=1;
// 		}

// 		if(llamarp==1){
// 			alrm = setInterval(function(){msg()},3000);
// 			console.log('Creada alarma '+alrm);
// 		} else {
// 			console.log('Parada alarma '+alrm);
// 			clearInterval(alrm);
// 			console.log('Se ha terminado de mandar mensajes');
// 		}

// 		function msg(){
// 			message.mentions.users.first().send({
// 				files: [{
// 					attachment: 'Otros/llamar.png',
// 					name: 'llamar.png'
// 				}]
// 			  })
// 				.catch(console.error);
// 			console.log('Msg enviado');
// 			return;
// 		}
// 	} else {
// 		message.channel.send('No tienes privilegios suficientes').catch(console.error);
// 	}
// }

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
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
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId(`Alarma`)
					.setLabel(`Parar de llamar a ${destino.username}`)
					.setStyle('PRIMARY'),
			);
		console.log(row)

		return interaction.reply({ content: 'Se va a llamar a '+destino.username, components: [row] });
		
		

		function msg(){
			destino.send({
				files: [{
					//attachment: '../Datos/llamar.png',
					attachment: 'Otros/llamar.png',
					name: 'llamar.png'
				}]
			  })
				.catch(console.error);
			console.log('Msg enviado');
			return;
		}

		//return interaction.reply({ content: 'Pong!', ephemeral: true });
	},
};

