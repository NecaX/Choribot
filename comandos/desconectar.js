exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo"].includes(r.name)) ) {
		if (message.member.voiceChannel) {
		  message.member.voiceChannel.leave()
			.then(connection => {
			  message.reply('Me he desconectado al canal de voz correctamente');
			})
			.catch(console.log);
		} else {
		  message.reply('Necesitas estar en un canal de voz primero');
		}
	} else {
		message.channel.send('No tienes privilegios suficientes').catch(console.error);
	}
}