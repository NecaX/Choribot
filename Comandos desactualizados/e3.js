exports.run = (client, message, args) => {
		const Discord = require("discord.js");

		const embed = new Discord.RichEmbed() 
		.setColor(0x00AE86)
		.setFooter("Creado por NecaX", client.user.avatarURL)
        .setTimestamp()
        .attachFile('Otros/E3.PNG')
		.addField("Streaming",
				  "https://www.twitch.tv/alexelcapo");
		
        message.channel.send({embed}).catch(console.error);
}