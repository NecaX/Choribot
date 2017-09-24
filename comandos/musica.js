exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo", "Choribot"].includes(r.name)) ) {
		if (message.member.voiceChannel) {
		  message.member.voiceChannel.join()
			.then(connection => { 
				if(args[0] == null) {
					message.channel.send('No has introducido ningun argumento, para ver los argumentos escribe $musica argumentos');		
				} else {
					const fs = require('fs');
					var arg = args[0].toLowerCase();
					var path = './musica'
					var i = 0;

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
									name: "Reproducir",
									value: ".."
								},
								{
									name: "Desconectar",
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
								message.channel.send(files.length).catch(console.error); //Escribe todo el array files o files[x]
								
							});
							break;
						
						case 'desconectar' :
							client.voiceConnections.last().channel.leave();
							break;
						
						case 'reproducir' :

							if(args[1] == null) {
								fs.readdir(path, function (err, files) { //Leemos los ficheros de la carpeta con ubicacion en path
									if (err) return console.log(err);
									var cancion = './musica/' + files[i];
									var stream = fs.createReadStream(cancion);
									message.channel.send('Reproduciendo a: ' + cancion);
									var dispatcher = connection.playStream(stream);
									dispatcher.setVolume(0.15);
									dispatcher.on('end', () => {
										message.channel.send('musica parada a').catch(console.error);
										//message.delete();
									});
								});
							} else {
								var str = args[1].toLowerCase();
								var patt = /^[0-9]*$/
								if (patt.test(str)) {
									fs.readdir(path, function (err, files) { //Leemos los ficheros de la carpeta con ubicacion en path
										if (err) return console.log(err);
										var cancion = './musica/' + files[str];
										var stream = fs.createReadStream(cancion);
										message.channel.send('Reproduciendo b: ' + cancion);
										var dispatcher = connection.playStream(stream);
										dispatcher.setVolume(0.15);
										dispatcher.on('end', () => {
											message.channel.send('musica parada b').catch(console.error);
										});
									});
								} else {
									message.channel.send('no es valido').catch(console.error);
								}
							}
							
							
								
							/* } else {
								fs.readdir(path, function (err, files) { //Leemos los ficheros de la carpeta con ubicacion en path
									if (err) return console.log(err);
									var j = args[1];
									var stream = fs.createReadStream('./musica/' + files[j]);
									var dispatcher = connection.playStream(stream);
									dispatcher.setVolume(0.15);
									dispatcher.on('end', () => {
										j = j+1;
										message.channel.send('$musica reproducir ' + j).catch(console.error);
										message.channel.send('3').catch(console.error);
										//message.delete();
									});
								});
							} */
							break;		
							
							
							
							//var stream = fs.createReadStream('./musica/pipo.mp3');
							//const dispatcher = connection.playStream(stream);
							//const dispatcher = connection.playArbitraryInput('https://choribot.000webhostapp.com/music/Pipo.mp3');				
					}
				}
								
				
			})
			.catch(console.log);
		} else {
		  message.reply('Necesitas estar en un canal de voz primero');
		}
	} else {
		message.channel.send('No tienes privilegios suficientes').catch(console.error);
	}
}