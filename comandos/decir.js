exports.run = (client, message, args) => {
	if (args[0] != null) {
		if(message.member.roles.cache.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna"].includes(r.name)) ) {
			let text = args.slice(0).join(" ");
			message.delete();
			message.channel.send(text, {tts: true}).catch(console.error);
		} else {
			message.channel.send('No tienes privilegios suficientes').catch(console.error);
		}
	} else {
		message.channel.send('No has introducido ningun mensaje').catch(console.error);
	}
}