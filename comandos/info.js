exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo"].includes(r.name)) ) {
		message.author.send("ID Canal - "+message.channel.id);
		message.author.send("ID Server - "+message.guild.id);
		message.author.send("Nombre usuario cliente - "+client.user.username);
		message.author.send("Url imagen usuario cliente - "+client.user.avatarURL);
	}
}

