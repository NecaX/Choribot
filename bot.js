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

// Telegram
const { BotAPI } = require("teleapiwrapper");
const telegramSetup = require("./lib/telegram2discord/setup");

// Discord
const Discord = require("discord.js");
const discordSetup = require("./lib/discord2telegram/setup");
const clientd = new Discord.Client();
const config = require("./config.json");
var off = 0; //musica
var llamarp = 0; //llamar
var alrm;

clientd.on("ready", () => {
	console.log("En marcha!");
});

clientd.on("guildMemberAdd", (member) => {
  console.log(`Nuevo Usuario "${member.user.username}" Ha entrado a "${member.guild.name}"` );
  
  client.channels.find('id','294922283942674443').send(member.user.username+' ha entrado al servidor', {tts: true});
});

clientd.on("message", (message, author) => {
	
	if (message.author.bot) return;
	if (message.content.startsWith(config.prefix)) { //Comandos que empiezan por el prefijo
	  
		const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		
		try {
			let commandFile = require(`./comandos/${command}.js`);
			commandFile.run(clientd, message, args);
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

clientd.on("voiceStateUpdate", (GuildMember) => { //Indica que alguien se ha conectado al canal de voz principal
	if(GuildMember.voiceChannelID != '294922283942674444'){
		//client.channels.find('id','294922283942674443').send(GuildMember.user.username+' ahora esta conectado al Mercado de la Sal, ¡Bienvenido!', {tts: true});
		console.log(GuildMember.user.username+' Se ha conectado')
	}else{
		//client.channels.find('id','294922283942674443').send(GuildMember.user.username+' se ha desconectado del Mercado de la Sal, ¡A la mierda!', {tts: true});
		console.log(GuildMember.user.username+' Se ha desconectado')
	}
});

clientd.login(config.token);

// Integración Telegram - Discord

try {
	// Migrate the settings from JSON to YAML
	const settingsPathJSON = path.join(__dirname, "settings.json");
	const settingsPathYAML = path.join(__dirname, "settings.yaml");
	migrateSettingsToYAML(settingsPathJSON, settingsPathYAML);

	// Get the settings
	const settings = Settings.fromFile(settingsPathYAML);

	// Save the settings, as they might have changed
	settings.toFile(settingsPathYAML);

	// Create a Telegram bot
	const tgBot = new BotAPI(settings.telegram.token);

	// Create/Load the discord user map
	const dcUsers = new DiscordUserMap(path.join(__dirname, "data", "discord_users.json"));

	// Create a message ID map
	const messageMap = new MessageMap();

	// Create the bridge map
	const bridgeMap = new BridgeMap(settings.bridges.map((bridgeSettings) => new Bridge(bridgeSettings)));

	/*********************
	 * Set up the bridge *
	 *********************/

	discordSetup(clientd, tgBot, dcUsers, messageMap, bridgeMap, settings);
	telegramSetup(tgBot, clientd, dcUsers, messageMap, bridgeMap, settings);
} catch (err) {
	// Log the timestamp and re-throw the error
	Application.logger.error(err);
	throw err;
}