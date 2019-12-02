exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna", "Usuarios"].includes(r.name)) ) {
		if(message.member.voiceChannel){ //Se conecta al canal de voz del que lo llame
			const Discord = require("discord.js");
			const command = args[0];
			const folder = './Otros/musica';
			const fs = require('fs');

			const path = require("path");
			const config = require("../config.json");

			switch (command) {
				case 'on':
					
					var musica = [];
					off = 0;
					fs.readdirSync(folder).forEach(file => {
						musica.push(file); //vector musica que contiene todas las canciones de la carpeta musica
					});
					
					var aleatorio = Math.floor((Math.random() * musica.length))
					client.channels.find('id','373208912545185809').send('Se esta reproduciendo: '+musica[aleatorio]).catch(console.error);
					client.channels.find('id','373208912545185809').setTopic('Se esta reproduciendo: '+musica[aleatorio]).catch(console.error);
					message.member.voiceChannel.join().then(connection => {
						//message.reply('Listo para la marcha')
						dispatcher = connection.playFile('./Otros/musica/'+musica[aleatorio]);
						
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
				case 'buscar':
					off = 0;
					var i=1;
					var nombre="";
					var cancion;
					while(args[i]!=null){
						nombre=nombre.concat(" "+args[i]);
						i++;
					}
					nombre=nombre.slice(1, nombre.length)
					var lista;					
					fs.readdirSync(folder).forEach(file => {
						if(file.toLowerCase().slice(0, file.length-4).includes(nombre.toLowerCase())){
							cancion=file;
						}
					});
										
					if(cancion!=null){
						if (message.member.voiceChannel) {
							//message.member.voiceChannel.leave();
						} else {
							message.reply('Necesitas estar en un canal de voz primero');
						}
						client.channels.find('id','373208912545185809').send('Se esta reproduciendo: '+cancion).catch(console.error);
						client.channels.find('id','373208912545185809').setTopic('Se esta reproduciendo: '+cancion).catch(console.error);
						message.member.voiceChannel.join().then(connection => {
							dispatcher = connection.playFile('./Otros/musica'+cancion);	


							dispatcher.on('end', () => {
								if(off == 0){
									try {
										let commandFile = require(`./musica.js`);
										commandFile.run(client, message, args);
									} catch (err) {
										console.error(err);
									}
								}
							});
						});
					}else{
						message.channel.send('No se ha encontrado ninguna canción que coincida');
					}			
					
				break;
				case 'lista':
					var canciones = '';
					var tot = 0;
					var i = 0;
					const embed = new Discord.RichEmbed();
					message.author.createDM().then((successMessage) => {
						message.channel.send('Lista de canciones enviada por DM, disfruta el spam').catch(console.error);
						fs.readdirSync(folder).forEach(file => {
							tot+=file.length+2;
							i++;
							if(tot<1024){
								canciones=canciones.concat(file+'\n');
							}else{
								message.author.send({embed: {
									color: 3447003,
									description: canciones
								}});
								tot=file.length+2;
								canciones=file+'\n';
							}
						});
						message.author.send({embed: {
							color: 3447003,
							description: "Número de canciones: "+i
						}});
						
					});	
				break;
				case 'youtube':
					const ytdl = require('ytdl-core');
					var YouTube = require('youtube-node');
					var youTube = new YouTube();
					var i=1;
					var nombre='';
					off = 1;
					youTube.setKey(config.youToken);

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
											let commandFile = require(`./musica.js`);
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
				default:
					message.channel.send('no se han reconocido los parametros');
				break;
			}
		}else{
			message.reply('Necesitas estar en un canal de voz primero');
		}
	} else {
		message.channel.send('No tienes privilegios suficientes').catch(console.error);
	}
}

