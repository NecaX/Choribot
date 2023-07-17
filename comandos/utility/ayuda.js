const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ayuda')
		.setDescription('Te envío una ayudita :)'),
	async execute(interaction) {

		const embed = new MessageEmbed() 
		.setTitle("Actualmente tengo los siguientes comandos:")
		.setAuthor(interaction.user.username, interaction.user.avatarURL())
		.setColor(0x00AE86)
		.setFooter("Creado por NecaX", interaction.client.user.defaultAvatarURL)
		.setTimestamp()
		.addField("/Ping",
				  "Para comprobar que sigo en el mismo plano que tú.")
		.addField("/Presentacion",
				  "Como buen ciudadano, me presento.")
		.addField("/Reacciones",
				  "Frases a las que reacciono.")
		.addField("/Decir",
				  "Toma mi voz y hazla tuya.")
		.addField("/Musica [on/off/cambia/buscar [...]/lista]",
				  "Para que podamos montar una fiesta (on -> canción aleatoria | off -> Apaga la música | cambia -> Cambia a canción aleatoria | buscar -> busca una canción | lista -> Te manda la lista de canciones.")
		.addField("/Youtube [...]",
				  "Ahora se utilizar el buscador de internet y te encuentro tus canciones favoritas")
		.addField("/Dado [X]D[Y]",
				  "Lanzo un dado de Y caras X veces.")
		.addField("/gatete", 
					"Envia una imagen de un gatete aleatorio")
		.addField("/perrete", 
					"Envia una imagen de un perrete aleatorio")
		.addField("/zorrito", 
					"Envia una imagen de un zorrito aleatorio")
		.addField("/animalico", 
					"Envia una imagen de un animalico aleatorio")
		.addField("/Borrar cantidad [usuario]",
				  "Para borrar una cantidad X de mensajes [De un usuario concreto].")
		.addField("/Llamar [@usuario/parar]",
				  "Envia mensajes sin parar a un usuario o para el envio.")
		.addField("/Conectados",
				  "Te digo quien esta conectado en el Mercado de la Sal.")		  
		.addField("/Sugerencia",
				  "Para enviar cualquier sugerencia para mi desarrollo.")
		.addField("/Ajam",
				  "Pues eso.")
		.addField("/About",
				  "Para saber cosas sobre mi creador y mi desarrollo.");
		return interaction.reply({ embeds: [embed], ephemeral: true });
	},
};