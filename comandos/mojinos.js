exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna", "Usuarios"].includes(r.name)) ) {
		if(message.member.voiceChannel){ //Se conecta al canal de voz del que lo llame
			const Discord = require("discord.js");
			const command = args[0];
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
				client.channels.find('id','373208912545185809').send('Se esta reproduciendo: '+musica[aleatorio]).catch(console.error);
				client.channels.find('id','373208912545185809').setTopic('Se esta reproduciendo: '+musica[aleatorio]).catch(console.error);
				message.member.voiceChannel.join().then(connection => {
					//message.reply('Listo para la marcha')
					dispatcher = connection.playFile('./Otros/musica/'+musica[aleatorio]);
					
					dispatcher.on('end', () => {
						//message.channel.send('Fin');
						if(off == 0){
							try {
								let commandFile = require(`./musica.js`);
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

