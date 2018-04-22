exports.run = (client, message, args) => {
	const Discord = require("discord.js");
	const embed = new Discord.RichEmbed()
	.setTitle("Actualmente reacciono a las siguientes preguntas:")
		.setAuthor(message.author.username, message.author.avatarURL)
		.setColor(0x000000)
		.setFooter("Creado por NecaX", client.user.avatarURL)
		.setTimestamp()
		.setDescription("Choribot, estas ahi? \nChoribot, eres del pp?");
		message.author.send({embed}).catch(console.error);		  
}