exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna"].includes(r.name)) ) {
		if(message.member.voiceChannel){ //Se conecta al canal de voz del que lo llame
			const command = args[0];
			switch (command) {
				case 'on':
					message.member.voiceChannel.join().then(connection => {
						//message.reply('Listo para la marcha')
						const dispatcher = connection.playFile('C:/Users/NecaX/Documents/GitHub/Choribot/musica/Yee.mp3');
						
						dispatcher.on('end', () => {
							message.channel.send('Fin');
							try {
								let commandFile = require(`./reproducir.js`);
								commandFile.run(client, message, args);
							} catch (err) {
								console.error(err);
							}
						});
					}).catch(console.log);
				break;
				case 'off':
						if (message.author.bot) return;
							if (message.member.voiceChannel) {
							  message.member.voiceChannel.leave().then(connection => {
								  message.reply('Me he desconectado al canal de voz correctamente');
								})
								.catch(console.log);
							} else {
							  message.reply('Necesitas estar en un canal de voz primero');
							}
						
				break;
				default:
					message.reply('Pon "$musica on" para poner música o "$musica off" para quitarla');
				break;
			}
		}else{
			message.reply('Necesitas estar en un canal de voz primero');
		}
	} else {
		message.channel.send('No tienes privilegios suficientes').catch(console.error);
	}
}

