exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna"].includes(r.name)) ) {
		var destino = args[0];

		message.channel.send(destino);
		if(destino == 'parar'){
			llamarp=0;
			alrm=null;
		}else{
			llamarp=1;
			if(client.users.find('username',destino)==null){
				message.channel.send('El nombre de usuario no existe').catch(console.error);
				return;
			}
			if(alrm!=null){
				message.channel.send('Ya se esta llamando a otro usuario').catch(console.error);
				return;
			}
		}

		if(llamarp==1){
			alrm = setInterval(function(){msg()},1000);
		} else{
			clearInterval(alrm);
		}
		

		function msg(){
			client.users.find('username',destino).send('Se te solicita en el Mercado de la Sal, acuda por favor').catch(console.error);
			console.log('Msg enviado');
			return;
		}
		
		
		
		console.log('fin');
	} else {
		message.channel.send('No tienes privilegios suficientes').catch(console.error);
	}
}


	
