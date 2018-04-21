exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna"].includes(r.name)) ) {
		if(message.member.voiceChannel){ //Se conecta al canal de voz del que lo llame
			const command = args[0];
			switch (command) {
				case 'on':
					const folder = './musica';
					const fs = require('fs');
					var musica = [];
					off = 0;
					
					fs.readdirSync(folder).forEach(file => {
						musica.push(file); //vector musica que contiene todas las canciones de la carpeta musica
					});
					
					var aleatorio = Math.floor((Math.random() * musica.length))
					message.channel.send('Se esta reproduciendo: '+musica[aleatorio]).catch(console.error);
					message.member.voiceChannel.join().then(connection => {
						//message.reply('Listo para la marcha')
						const dispatcher = connection.playFile('./musica/'+musica[aleatorio]);
						
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
				break;
				case 'off':
						off = 1;
						if (message.author.bot) return;
							if (message.member.voiceChannel) {
								message.member.voiceChannel.leave();
							} else {
								message.reply('Necesitas estar en un canal de voz primero');
							}
				break;
				case 'cambia':
					off = 1;
					if (message.member.voiceChannel) {
						message.member.voiceChannel.leave();
					} else {
						message.reply('Necesitas estar en un canal de voz primero');
					}
					const argsc = 'on'.trim().split(/ +/g);
					off = 0;
					try {
						let commandFile = require(`./musica.js`);
						commandFile.run(client, message, argsc);
					} catch (err) {
						console.error(err);
					}
				break;
				case 'pausa':
					dispatcher.pause(); // Pause the stream
				break;
				case 'play':
					dispatcher.resume();
				break;
				default:
					message.reply('Comandos: "$musica on" para poner música | "$musica off" para quitarla | "$musica cambia" para cambiar de canción');
				break;
			}
		}else{
			message.reply('Necesitas estar en un canal de voz primero');
		}
	} else {
		message.channel.send('No tienes privilegios suficientes').catch(console.error);
	}
}

