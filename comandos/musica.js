exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna"].includes(r.name)) ) {
		if(message.member.voiceChannel){ //Se conecta al canal de voz del que lo llame
			const Discord = require("discord.js");
			const command = args[0];
			const folder = './musica';
			const fs = require('fs');
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
						const dispatcher = connection.playFile('./musica/'+musica[aleatorio]);
						
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
					off = 1;
					var i=1;
					var nombre='';
					var cancion;
					while(args[i]!=null){
						nombre=nombre.concat(args[i]+' ');
						i++;
					}
					nombre=nombre.split(" ")[0];
					var lista;
					fs.readdirSync(folder).forEach(file => {
						if(file.toLowerCase().includes(nombre.toLowerCase())){
							cancion=file;
						}
					});
										
					if(cancion!=null){
						if (message.member.voiceChannel) {
							message.member.voiceChannel.leave();
						} else {
							message.reply('Necesitas estar en un canal de voz primero');
						}
						client.channels.find('id','373208912545185809').send('Se esta reproduciendo: '+cancion).catch(console.error);
						client.channels.find('id','373208912545185809').setTopic('Se esta reproduciendo: '+cancion).catch(console.error);
						message.member.voiceChannel.join().then(connection => {
							const dispatcher = connection.playFile('./musica/'+cancion);	
						});
					}else{
						message.channel.send('No se ha encontrado ninguna canción que coincida');
					}
					off=0;
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

