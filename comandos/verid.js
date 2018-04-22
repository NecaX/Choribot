exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo"].includes(r.name)) ) {
		message.channel.send(message.channel.id);
	}
}

