exports.run = (client, message, args) => {
	if(message.member.roles.cache.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna", "Usuarios"].includes(r.name)) ) {
		if(message.member.voice.channel){ //Se conecta al canal de voz del que lo llame
			const Discord = require("discord.js");
			const command = args[0];
			const fs = require('fs');
			const ytdl = require('ytdl-core');

			const path = require("path");
			const config = require("../config.json");

			var YouTube = require('youtube-node');
			var youTube = new YouTube();
			var i=0;
			var nombre='';
			off = 0;
		
			youTube.setKey(config.youtoken);
			

			switch(args[0]){
				case 'off':
					off = 1;
					if (message.author.bot) return;
						if (message.member.voice.channel) {
							message.member.voice.channel.leave();
						} else {
							message.reply('Necesitas estar en un canal de voz primero');
						}
				break;
				case undefined:
					message.reply('Indica un termino que buscar o pon la url de un video');
				break;
				default:
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
							const streamOptions = { seek: 0, volume: 1 };
							message.member.voice.channel.join().then(connection => {
								const stream = ytdl(url, { filter : 'audioonly' });
								const dispatcher = connection.play(stream, streamOptions);
								off=0;
								dispatcher.on('end', () => {
									if(off == 0){
										try {
											let commandFile = require(`./youtube.js`);
											commandFile.run(client, message, args);
										} catch (err) {
											console.error(err);
										}
									}
								});
		
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

