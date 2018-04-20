exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna"].includes(r.name)) ) {
		if(message.member.voiceChannel){ //Se conecta al canal de voz del que lo llame
			const ytdl = require('ytdl-core');
			const streamOptions = { seek: 0, volume: 1 };
			message.member.voiceChannel.join().then(connection => {
				message.reply('Listo para la marcha')
				
				const stream = ytdl('https://www.youtube.com/watch?v=YrPTwylSs8U&t', { filter : 'audioonly' });
				const dispatcher = connection.playStream(stream, streamOptions);
			}).catch(console.log);
		}else{
			message.reply('Necesitas estar en un canal de voz primero');
		}
	} else {
		message.channel.send('No tienes privilegios suficientes').catch(console.error);
	}
}