"use strict";

//General
const path = require("path");
const Application = require("./lib/Application");
const MessageMap = require("./lib/MessageMap");
const DiscordUserMap = require("./lib/discord2telegram/DiscordUserMap");
const Bridge = require("./lib/bridgestuff/Bridge");
const BridgeMap = require("./lib/bridgestuff/BridgeMap");
const Settings = require("./lib/settings/Settings");
const migrateSettingsToYAML = require("./lib/migrateSettingsToYAML");
const settingsPathJSON = path.join(__dirname, "settings.json");
const settingsPathYAML = path.join(__dirname, "settings.yaml");
migrateSettingsToYAML(settingsPathJSON, settingsPathYAML);
const settings = Settings.fromFile(settingsPathYAML);
settings.toFile(settingsPathYAML);
var off = 0; //musica
var llamarp = 0; //llamar
var alrm = null;

// Telegram
const { BotAPI } = require("teleapiwrapper");
const telegramSetup = require("./lib/telegram2discord/setup");
const tgBot = new BotAPI(settings.telegram.token);

// Discord
const Discord = require("discord.js");
const discordSetup = require("./lib/discord2telegram/setup");
const discBot = new Discord.Client();
const config = settings.discord;

//Puente
try {
	const dcUsers = new DiscordUserMap(path.join(__dirname, "data", "discord_users.json"));
	const messageMap = new MessageMap();
	const bridgeMap = new BridgeMap(settings.bridges.map((bridgeSettings) => new Bridge(bridgeSettings)));

	/*********************
	 * Set up the bridge *
	 *********************/

	discordSetup(discBot, tgBot, dcUsers, messageMap, bridgeMap, settings);
	telegramSetup(tgBot, discBot, dcUsers, messageMap, bridgeMap, settings);
} catch (err) {
	Application.logger.error(err);
	throw err;
}


discBot.on("ready", () => {
	console.log("En marcha!");
	//Inicio
	try {
		let commandFile = require(`./inicio.js`);
		commandFile.run(discBot);
	} catch (err) {
		console.error(err);
	}
});


discBot.on("guildMemberAdd", (member) => {
  console.log(`Nuevo Usuario "${member.user.username}" Ha entrado a "${member.guild.name}"` );
  
  discBot.channels.find('id','294922283942674443').send(member.user.username+' ha entrado al servidor', {tts: true});
});



discBot.on("message", (message, author) => {
	
	if (message.author.bot) { //Permitir ejecutar comandos de discord desde el movil
		var T2DCommand=message.content;
		while (T2DCommand.slice(0,1) != config.prefix && T2DCommand !== ""){ //Se elimina el nombre de la persona que ha emitido el mensaje
			T2DCommand = T2DCommand.slice(1);
		}
		if(T2DCommand == "") return;

		const args = T2DCommand.slice(config.prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();

		try {
			let commandFile = require(`./comandos/${command}.js`);
			commandFile.run(discBot, message, args);
		  } catch (err) {
			console.error(err);
		  }
		
	};
	if (message.content.startsWith(config.prefix)) { //Comandos que empiezan por el prefijo
	  
		const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		
		try {
			let commandFile = require(`./comandos/${command}.js`);
			commandFile.run(discBot, message, args);
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

discBot.on("voiceStateUpdate", (GuildMember) => { //Indica que alguien se ha conectado al canal de voz principal
	if(GuildMember.voiceChannelID != '294922283942674444'){
		//client.channels.find('id','294922283942674443').send(GuildMember.user.username+' ahora esta conectado al Mercado de la Sal, ¡Bienvenido!', {tts: true});
		console.log(GuildMember.user.username+' Se ha conectado')
	}else{
		//client.channels.find('id','294922283942674443').send(GuildMember.user.username+' se ha desconectado del Mercado de la Sal, ¡A la mierda!', {tts: true});
		console.log(GuildMember.user.username+' Se ha desconectado')
	}
});

discBot.login(config.token);

