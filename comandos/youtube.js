exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna", "Usuarios"].includes(r.name)) ) {
		if(message.member.voiceChannel){ //Se conecta al canal de voz del que lo llame
			const Discord = require("discord.js");
			const command = args[0];
			const ytdl = require('ytdl-core');
			var YouTube = require('youtube-node');
			var youTube = new YouTube();
			var i=0;
			var nombre='';
			off = 1;
			youTube.setKey('AIzaSyDOKNY4b4ryAZ_SZJhbCUyKqSeUNi2cWyo');

			switch(args[0]){
				case 'off':
					off = 1;
					if (message.author.bot) return;
						if (message.member.voiceChannel) {
							message.member.voiceChannel.leave();
						} else {
							message.reply('Necesitas estar en un canal de voz primero');
						}
				break;
				default:
					while(args[i]!=null){
						nombre=nombre.concat(args[i]+' ');
						i++;
					}
					youTube.search(nombre, 2, function(error, result) {
						if (error) {
							console.log(error);
						}
						else {
							var url = 'https://www.youtube.com/watch?v='+result.items[0].id.videoId;
							const streamOptions = { seek: 0, volume: 1 };
							message.member.voiceChannel.join().then(connection => {
								const stream = ytdl(url, { filter : 'audioonly' });
								const dispatcher = connection.playStream(stream, streamOptions);
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

