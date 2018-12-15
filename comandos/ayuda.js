exports.run = (client, message, args) => {
	message.author.createDM().then((successMessage) => {
		const Discord = require("discord.js");
		console.log('Ayuda enviada a '+message.author);
		message.channel.send('ayudita en camino, revisa tus MD :)').catch(console.error);
		const embed = new Discord.RichEmbed() 
		.setTitle("Actualmente tengo los siguientes comandos:")
		.setAuthor(message.author.username, message.author.avatarURL)
		.setColor(0x00AE86)
		.setFooter("Creado por NecaX", client.user.avatarURL)
		.setTimestamp()
		.addField("/Ping",
				  "Para comprobar que sigo en el mismo plano que tú.")
		.addField("/Presentacion",
				  "Como buen ciudadano, me presento.")
		.addField("/Reacciones",
				  "Frases a las que reacciono.")
		.addField("/Decir",
				  "Toma mi voz y hazla tuya.")
		.addField("/Musica [on/off/cambia/buscar [...]/youtube [...]/lista]",
				  "Para que podamos montar una fiesta (on -> canción aleatoria | off -> Apaga la música | cambia -> Cambia a canción aleatoria | buscar -> busca una canción | youtube -> busca una canción en youtube | lista -> Te manda la lista de canciones.")
		.addField("/Youtube [...]",
				  "Ahora se utilizar el buscador de internet y te encuentro tus canciones favoritas")
		.addField("/Dado [X]D[Y]",
				  "Lanzo un dado de Y caras X veces.")
		.addField("/Borrar cantidad [usuario]",
				  "Para borrar una cantidad X de mensajes [De un usuario concreto].")
		.addField("/Llamar [@usuario/parar]",
				  "Envia mensajes sin parar a un usuario o para el envio.")
		.addField("/Conectados",
				  "Te digo quien esta conectado en el Mercado de la Sal.")		  
		.addField("/Sugerencia",
				  "Para enviar cualquier sugerencia para mi desarrollo.")
		.addField("/About",
				  "Para saber cosas sobre mi creador y mi desarrollo.");
		
		message.author.send({embed}).catch(console.error);
	});
}