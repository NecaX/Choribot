exports.run = (client, message, args) => {
	if(message.member.roles.cache.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna", "Usuarios"].includes(r.name)) ) {
		if(message.member.voice.channel){ //Se conecta al canal de voz del que lo llame
			const Discord = require("discord.js");
			const command = args[0];
			// const folder = '../Datos/mojinos';
			const folder = './Otros/mojinos';
			const fs = require('fs');

			const path = require("path");
			const config = require("../config.json");
			
				var musica = [];
				off = 0;
				fs.readdirSync(folder).forEach(file => {
					musica.push(file); //vector musica que contiene todas las canciones de la carpeta musica
				});
				
				var aleatorio = Math.floor((Math.random() * musica.length))
				client.channels.fetch('373208912545185809').then(channel => channel.send('Se esta reproduciendo: '+musica[aleatorio]).catch(console.error));
				client.channels.fetch('373208912545185809').then(channel => channel.setTopic('Se esta reproduciendo: '+musica[aleatorio]).catch(console.error));
				message.member.voice.channel.join().then(connection => {
					//message.reply('Listo para la marcha')
					dispatcher = connection.play(folder+'/'+musica[aleatorio]);
					
					dispatcher.on('end', () => {
						//message.channel.send('Fin');
						if(off == 0){
							try {
								let commandFile = require(`./mojinos.js`);
								commandFile.run(client, message, args);
							} catch (err) {
								console.error(err);
							}
						}
					});
				}).catch(console.log);
		}else{
			message.reply('Necesitas estar en un canal de voz primero');
		}
	} else {
		message.channel.send('No tienes privilegios suficientes').catch(console.error);
	}
}

