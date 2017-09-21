const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");


client.on("ready", () => {
	console.log("En marcha!");
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
			// Mas conversaciones
		}
	}
});

client.login(config.token);