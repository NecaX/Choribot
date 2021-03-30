const ytdl = require('ytdl-core-discord');
const config = require("../config.json");

async function play(connection, url, voiceChannel) {
	const dispatcher = connection.play(await ytdl(url), { type: 'opus' });
	dispatcher.on('finish', () => {
		voiceChannel.leave();
	})
}

exports.run = (client, message, args) => {
	if(message.member.roles.cache.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna", "Usuarios"].includes(r.name)) ) {
		var voiceChannel = message.member.voice.channel
		if(voiceChannel){ //Se conecta al canal de voz del que lo llame

			var YouTube = require('youtube-node');
			var youTube = new YouTube();
			youTube.setKey(config.youtoken);

			switch(args[0]) {
				case 'off':
					if (message.author.bot) return;

					if (voiceChannel) {
						voiceChannel.leave();
					} else {
						message.reply('Necesitas estar en un canal de voz primero');
					}
					break;

				case undefined:
					message.reply('Indica un termino que buscar o pon la url de un video');
					break;

				default:
					var i=0;
					var nombre='';
					console.log(args[0])
					while(args[i]!=null){
						nombre=nombre.concat(args[i]+' ');
						i++;
					}
					youTube.search(nombre, 2, function(error, result) {
						if (error) {
							console.log(error);
						}
						else {
							if (args[0].includes('https://www.youtube.com')){
								var url = args[0];
							} else{
								var url = 'https://www.youtube.com/watch?v='+result.items[0].id.videoId;
							}
							
							console.log(url);
							voiceChannel.join().then(connection => {
								play(connection, url, voiceChannel)		
							}).catch(console.error);
						}
					});
					break;
			}
		}else{
			message.reply('Necesitas estar en un canal de voz primero');
		}
	} else {
		message.channel.send('No tienes privilegios suficientes').catch(console.error);
	}
}

