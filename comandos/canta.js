exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo"].includes(r.name)) ) {
		if (message.member.voiceChannel) {
		  message.member.voiceChannel.join()
			.then(connection => { 
				const fs = require('fs');
				//const stream = fs.createReadStream('./musica/coches de choque.mp3');
				//const dispatcher = connection.playStream(stream);
				//dispatcher.setVolume(0.15);
				var path = './musica'
				fs.readdir(path, function (err, files) { //Leemos los ficheros de la carpeta con ubicacion en path
					if (err) return console.log(err);
					message.channel.send(files).catch(console.error); //Escribe todo el array files o files[x]
				});
			})
			.catch(console.log);
		} else {
		  message.reply('Necesitas estar en un canal de voz primero');
		}
	} else {
		message.channel.send('No tienes privilegios suficientes').catch(console.error);
	}
}