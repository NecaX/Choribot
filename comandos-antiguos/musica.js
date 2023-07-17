exports.run = (client, message, args) => {
	if(message.member.roles.cache.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna", "Usuarios"].includes(r.name)) ) {
		if(message.member.voice.channel){ //Se conecta al canal de voz del que lo llame
			const Discord = require("discord.js");
			const command = args[0];
			const folder = './Otros/musica';
			// const folder = '../Datos/musica';
			const fs = require('fs');

			const path = require("path");
			const config = require("../config.json");

			var bucle

			if(args[args.length-1] == "bucle"){
				bucle = true
			} else {
				bucle = false
			}
			console.log(args[args.length-1] + "-" + bucle)

			switch (command) {
				case 'on':
					
					var musica = [];
					off = 0;
					fs.readdirSync(folder).forEach(file => {
						musica.push(file); //vector musica que contiene todas las canciones de la carpeta musica
					});
					
					var aleatorio = Math.floor((Math.random() * musica.length))
					client.channels.fetch('373208912545185809').then(channel => channel.send('Se esta reproduciendo: '+musica[aleatorio]).catch(console.error));
					client.channels.fetch('373208912545185809').then(channel => channel.setTopic('Se esta reproduciendo: '+musica[aleatorio]).catch(console.error));
					message.member.voice.channel.join().then(connection => {
						dispatcher = connection.play(folder+'/'+musica[aleatorio]);


						dispatcher.on('finish', () => {
							if(off == 0){
								if(bucle == true){
									try {
										let commandFile = require(`./musica.js`);
										commandFile.run(client, message, args);
									} catch (err) {
										console.error(err);
									}
								} else {
									message.member.voice.channel.leave();
								}
								
							}
						});
					});					
				break;
				case 'off':
						off = 1;
						if (message.author.bot) return;
							if (message.member.voice.channel) {
								message.member.voice.channel.leave();
							} else {
								message.reply('Necesitas estar en un canal de voz primero');
							}
				break;
				case 'cambia':
					off = 1;
					if (message.member.voice.channel) {
						message.member.voice.channel.leave();
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
					if(bucle == true){
						while(args[i]!=null){
							if(args[i] != "bucle"){
								nombre=nombre.concat(" "+args[i]);								
							}
							i++;
						}
					}else{
						while(args[i]!=null){
							nombre=nombre.concat(" "+args[i]);
							i++;
						}
					}
					console.log(nombre)
					nombre=nombre.slice(1, nombre.length)
					var lista;					
					fs.readdirSync(folder).forEach(file => {
						if(file.toLowerCase().slice(0, file.length-4).includes(nombre.toLowerCase())){
							cancion=file;
						}
					});
										
					if(cancion!=null){
						if (message.member.voice.channel) {
							//message.member.voice.channel.leave();
						} else {
							message.reply('Necesitas estar en un canal de voz primero');
						}
						client.channels.fetch('373208912545185809').then(channel => channel.send('Se esta reproduciendo: '+cancion).catch(console.error));
						client.channels.fetch('373208912545185809').then(channel => channel.setTopic('Se esta reproduciendo: '+cancion).catch(console.error));
						message.member.voice.channel.join().then(connection => {
							const dispatcher = connection.play(folder+'/'+cancion);	


							dispatcher.on('finish', () => {
								if(off == 0){
									if(bucle == true){
										try {
											let commandFile = require(`./musica.js`);
											commandFile.run(client, message, args);
										} catch (err) {
											console.error(err);
										}
									} else {
										message.member.voice.channel.leave();
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
					const embed = new Discord.MessageEmbed();
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

