exports.run = (client, message, args) => {
	message.channel.send('Actualmente tengo los siguientes comandos:').catch(console.error);
	message.channel.send('$Ping: Para comprobar que sigo en el mismo plano que tú').catch(console.error);
	message.channel.send('$Presentacion: Como buen ciudadano, me presento').catch(console.error);
	message.channel.send('$Reacciones: Frases a las que reacciono').catch(console.error);
	message.channel.send('$Decir: Toma mi voz y hazla tuya').catch(console.error);
	message.channel.send('$Dado [X]D[Y]: Lanzo un dado de Y caras X veces').catch(console.error);
	message.channel.send('$About: Para saber cosas sobre mi creador y mi desarrollo').catch(console.error);
}