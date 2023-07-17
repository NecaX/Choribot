exports.run = (client, message, args) => {
	if(message.member.roles.cache.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna", "Usuarios"].includes(r.name)) ) {
		if(message.member.voice.channel){ //Se conecta al canal de voz del que lo llame
			const Discord = require("discord.js");
			const command = args[0];
			const fs = require('fs');
			var destino = args[0];
			
			var {PythonShell} = require('python-shell');

			message.member.voice.channel.join().then(connection => {
				//message.reply('Listo para la marcha')
				const audio = connection.receiver.createStream(message.mentions.users.first(), { mode: 'pcm', end: 'manual' })
				
				audio.on('debug', () => {
					console.log(audio.error)
				})
				
				setTimeout(function(){
					audio.pipe(fs.createWriteStream('user_audio'));
					audio.destroy()
					message.member.voice.channel.leave()
					const spawn = require("child_process").spawn;
					const pythonProcess = spawn('python',["audiototext.py"]);
					pythonProcess.stdout.on('data', (data) => {
						console.log("AAA")
						console.log(data)
					});
				}, 5000);

				setTimeout(function(){
					PythonShell.run('audiototext.py', null, function (err, results) {
						if (err) throw err;
						console.log('finished');
						console.log('results: %j', results);
					  });
				}, 6000);
				
				
				// dispatcher.on('end', () => {
				// 	//message.channel.send('Fin');
				// 	if(off == 0){
				// 		try {
				// 			let commandFile = require(`./mojinos.js`);
				// 			commandFile.run(client, message, args);
				// 		} catch (err) {
				// 			console.error(err);
				// 		}
				// 	}
				// });
			}).catch(console.log);
		}else{
			message.reply('Necesitas estar en un canal de voz primero');
		}
	} else {
		message.channel.send('No tienes privilegios suficientes').catch(console.error);
	}
}

