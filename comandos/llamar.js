exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna"].includes(r.name)) ) {
		var destino = args[0];

		if(destino == 'parar'){
			llamarp=0;
			message.channel.send('Se ha dejado de llamar');
		}else{
			message.channel.send('Se va a llamar a '+destino);
			if((client.users.find('username',destino)==null) && (client.users.find('username',message.mentions.users.first().username)==null)){
				message.channel.send('El nombre de usuario no existe').catch(console.error);
				return;
			}
			if(typeof alrm != 'undefined'){
				console.log(alrm._idleTimeout);
				if(alrm._idleTimeout > 0){
					message.channel.send('Ya se esta llamando a otro usuario').catch(console.error);
					return;
				}
			}
			llamarp=1;
		}

		if(llamarp==1){
			alrm = setInterval(function(){msg()},3000);
			console.log('Creada alarma '+alrm);
		} else {
			console.log('Parada alarma '+alrm);
			clearInterval(alrm);
			console.log('Se ha terminado de mandar mensajes');
		}

		function msg(){
			message.mentions.users.first().send({
				files: [{
					attachment: 'Otros/gansosenal.png',
					name: 'gansosenal.png'
				}]
			  })
				.catch(console.error);
			console.log('Msg enviado');
			return;
		}
	} else {
		message.channel.send('No tienes privilegios suficientes').catch(console.error);
	}
}



