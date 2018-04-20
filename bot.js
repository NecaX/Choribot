const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");


client.on("ready", () => {
	console.log("En marcha!");
});

client.on("guildMemberAdd", (member) => {
  console.log(`Nuevo Usuario "${member.user.username}" Ha entrado a "${member.guild.name}"` );
  
  client.channels.find('id','294922283942674443').send(member.user.username+' ha entrado al servidor', {tts: true});
});

client.on("message", (message, author) => {
	
	if (message.author.bot) return;
	if (message.content.startsWith(config.prefix)) { //Comandos que empiezan por el prefijo
	  
		const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		
		try {
			let commandFile = require(`./comandos/${command}.js`);
			commandFile.run(client, message, args);
		  } catch (err) {
			console.error(err);
		  }
	}
	
	if (message.content.startsWith('Choribot')) { //Comandos conversacionales
		
		const command = message.content.toLowerCase();
		
		switch (command) {
			case 'choribot, estas ahi?':
				message.channel.send('Si señor '+message.author+' , me encuentro en tu mismo plano', {tts: true});
			break;
			
			case 'choribot, eres del pp?':
				message.channel.send('Quita, quita, que ajco, no?', {tts: true});
			break;
			
			case 'choribot prueba':
				message.channel.send(message.channel.id);
			break;
			// Mas conversaciones
		}
	}
});


client.login(config.token);