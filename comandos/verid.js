exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo"].includes(r.name)) ) {
		message.author.send("ID Canal - "+message.channel.id);
		message.author.send("ID Server - "+message.guild.id);
	}
}

