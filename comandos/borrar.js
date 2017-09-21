exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna"].includes(r.name)) ) {
		const user = message.mentions.users.first();
		const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
		if (!amount) return message.reply('tienes que indicar cuantos mensajes borrar');
		if (!amount && !user) return message.reply('tienes que indicar cuantos mensajes borrar y/o un usuario');
		message.channel.fetchMessages({
			limit: amount,
		}).then((messages) => {
			if (user) {
				const filterBy = user ? user.id : Client.user.id;
				messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
			}
			message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
		});
	} else {
		message.channel.send('No tienes privilegios suficientes').catch(console.error);
	}
}
