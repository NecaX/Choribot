exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo"].includes(r.name)) ) {
		  client.voiceConnections.last().channel.leave();
	} else {
		message.channel.send('No tienes privilegios suficientes').catch(console.error);
	}
}