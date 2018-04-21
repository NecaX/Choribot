exports.run = (client, message, args) => {
	message.author.createDM().then((successMessage) => {
		console.log('Ayuda enviada a '+message.author);
		message.channel.send('ayudita en camino, revisa tus MD :)').catch(console.error);
		message.author.send('Actualmente tengo los siguientes comandos:').catch(console.error);
		message.author.send('$Ping: Para comprobar que sigo en el mismo plano que tú').catch(console.error);
		message.author.send('$Presentacion: Como buen ciudadano, me presento').catch(console.error);
		message.author.send('$Reacciones: Frases a las que reacciono').catch(console.error);
		message.author.send('$Decir: Toma mi voz y hazla tuya').catch(console.error);
		message.author.send('$Musica lista: Mira la lista de canciones que puede sonar').catch(console.error);
		message.author.send('$Musica [on/off/cambia]: Pon, quita o cambia de música, todo el proceso es aleatorio, calla y disfruta').catch(console.error);
		message.author.send('$[EN OBRAS]Busca: Busco un video en YouTube y te reproduzco el audio').catch(console.error);
		message.author.send('$Dado [X]D[Y]: Lanzo un dado de Y caras X veces').catch(console.error);
		message.author.send('$Borrar cantidad [@usuario] : Para borrar una cantidad X de mensajes [De un usuario concreto]').catch(console.error);
		message.author.send('$Sugerencia: Para enviar cualquier sugerencia para mi desarrollo').catch(console.error);
		message.author.send('$About: Para saber cosas sobre mi creador y mi desarrollo').catch(console.error);
	});
	
	
}