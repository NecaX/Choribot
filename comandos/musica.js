exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo"].includes(r.name)) ) {
		if (message.member.voiceChannel) {
		  message.member.voiceChannel.join()
			.then(connection => { 
				if(args[0] == null) {
					message.channel.send('No has introducido ningun armuento, para ver los argumentos escribe $musica argumentos');		
				} else {
					const fs = require('fs');
					var arg = args[0].toLowerCase();
					var path = './musica'
					message.channel.send(arg);

					switch (arg) {					
						case 'argumentos' :
							message.channel.send({embed: {
							color: 39168,
							title: "Argumentos disponibles:",
							fields: [
								{
									name: "Disponible",
									value: "Muestra las canciones que puedo cantarte."
								},
								{
									name: "2",
									value: ".."
								}
							],
							timestamp: new Date()					
							}
							});
							break;
						
						case 'disponible' :
							fs.readdir(path, function (err, files) { //Leemos los ficheros de la carpeta con ubicacion en path
								if (err) return console.log(err);
								message.channel.send(files).catch(console.error); //Escribe todo el array files o files[x]
							});
							break;
						
					}
				}
				
				
				
				// const stream = fs.createReadStream('./musica/Himno de la URSS.mp3');
				// const dispatcher = connection.playStream(stream);
				// dispatcher.setVolume(0.15);
				
				
			})
			.catch(console.log);
		} else {
		  message.reply('Necesitas estar en un canal de voz primero');
		}
	} else {
		message.channel.send('No tienes privilegios suficientes').catch(console.error);
	}
}