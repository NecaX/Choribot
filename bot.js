"use strict";

//General
const path = require("path");
const Application = require("./lib/Application");
//const MessageMap = require("./lib/MessageMap");
// const DiscordUserMap = require("./lib/discord2telegram/DiscordUserMap");
// const Bridge = require("./lib/bridgestuff/Bridge");
// const BridgeMap = require("./lib/bridgestuff/BridgeMap");
const Settings = require("./lib/settings/Settings");
//const migrateSettingsToYAML = require("./lib/migrateSettingsToYAML");
//const settingsPathJSON = path.join(__dirname, "settings.json");
const settingsPathYAML = path.join(__dirname, "settings.yaml");
//migrateSettingsToYAML(settingsPathJSON, settingsPathYAML);
const settings = Settings.fromFile(settingsPathYAML);
//settings.toFile(settingsPathYAML);
alrm = setInterval(function(){resetCon()},15000); //Resetear conexiones
var lastUserC = 0 // Ultimo usuario en conectarse
var lastUserD = 0 // Ultimo usuuario en desconectarse
var off = 0; //musica
var llamarp = 0; //llamar
var alrm = null;
const fs = require('fs');
var http = require('http');
var bat = require('./bat');
var berenjena = false;

// Telegram
// const { BotAPI } = require("teleapiwrapper");
// const telegramSetup = require("./lib/telegram2discord/setup");
// const tgBot = new BotAPI(settings.telegram.token);

// Discord
const Discord = require("discord.js");
//const discordSetup = require("./lib/discord2telegram/setup");
const discBot = new Discord.Client();
const config = settings.discord;


//Puente
// try {
// 	const dcUsers = new DiscordUserMap(path.join(__dirname, "data", "discord_users.json"));
// 	const messageMap = new MessageMap();
// 	const bridgeMap = new BridgeMap(settings.bridges.map((bridgeSettings) => new Bridge(bridgeSettings)));

// 	/*********************
// 	 * Set up the bridge *
// 	 *********************/

// 	discordSetup(discBot, tgBot, dcUsers, messageMap, bridgeMap, settings);
// 	telegramSetup(tgBot, discBot, dcUsers, messageMap, bridgeMap, settings);
// } catch (err) {
// 	Application.logger.error(err);
// 	throw err;
// }


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



discBot.on("message", (message) => {
	if(berenjena == true){
		message.react('🍆').catch(console.error);
	}
	ejecutarcomandos(message);	
});

discBot.on("messageUpdate", (oldMessage, newMessage) => {
	ejecutarcomandos(newMessage);
});


discBot.on("voiceStateUpdate", (olduser,newuser) => { //Indica que alguien se ha conectado al canal de voz principal	
	if(newuser.voiceChannel == null && (olduser.voiceChannel.name == 'Mercado de la Sal' || olduser.voiceChannel.name == 'Callejon de los negros' || olduser.voiceChannel.name == 'Las puertas')){
		discBot.channels.find('name','patalking').send(olduser.user.username+' Se ha desconectado', {tts: true});
		discBot.channels.find('name','patalking').bulkDelete(1);		
		lastUserD = olduser.id;
		//escribirU(discBot);
	}
	if(newuser.voiceChannel != null){
		if((newuser.voiceChannel.name == 'Mercado de la Sal' || newuser.voiceChannel.name == 'Callejon de los negros' || olduser.voiceChannel.name == 'Las puertas') && olduser.voiceChannel == null){
			if(newuser.user.username == 'Iceword01'){
				discBot.channels.find('name','patalking').send('Javo se ha conectado', {tts: true});
				//discBot.channels.find('id','294922283942674443').send(newuser.user.username+' Se ha conectado', {tts: true});
			} else{
				discBot.channels.find('name','patalking').send(newuser.user.username+' Se ha conectado', {tts: true});
				//discBot.channels.find('id','294922283942674443').send(newuser.user.username+' Se ha conectado', {tts: true});
			}
			//discBot.channels.find('id','294922283942674443').bulkDelete(1);
			discBot.channels.find('name','patalking').bulkDelete(1);
			lastUserC = newuser.id;
			//escribirU(discBot);
		}
		if(discBot.channels.find('name','Mercado de la Sal').members.array().length == 1 && newuser.voiceChannel.name == 'Chorizo TV' && (olduser.voiceChannel == null || olduser.voiceChannel.name != 'Chorizo TV')){
			//discBot.channels.find('id','294922283942674443').send(newuser.user.username+' Se ha ido a ver la tele, ¿por qué no te unes? - https://discord.gg/jvxS47P');
			lastUserC = newuser.id;
			//escribirU(discBot);
		}
	}
});

discBot.login(config.token);

//funciones

function ejecutarcomandos(message){
	// if (message.author.bot) { //Permitir ejecutar comandos de discord desde Telegram
	// 	var T2DCommand=message.content;
	// 	var T2DCommAuth = "";
	// 	if (!message.content.startsWith(config.prefix)) {
	// 		while (T2DCommand.slice(0,1) != ":" && T2DCommand !== ""){ //Se elimina el nombre de la persona que ha emitido el mensaje
	// 			T2DCommAuth = T2DCommAuth.concat(T2DCommand.slice(0,1));
	// 			T2DCommand = T2DCommand.slice(1);
	// 		}
	// 		T2DCommAuth = T2DCommAuth.slice(2, -2);
			
	// 		while (T2DCommand.slice(0,1) != config.prefix && T2DCommand !== ""){ //Se elimina el nombre de la persona que ha emitido el mensaje
	// 			T2DCommand = T2DCommand.slice(1);
	// 		}
	// 		if(T2DCommand == "") return;

	// 		const args = T2DCommand.slice(config.prefix.length).trim().split(/ +/g);
	// 		const command = args.shift().toLowerCase();

	// 		if(discBot.users.find('username',T2DCommAuth)!==null){
	// 			T2DCommAuth = discBot.users.find('username',T2DCommAuth).id; //Se tranforma el username en el id
	// 			message.member = message.channel.members.find('id',T2DCommAuth);
	// 			message.content = T2DCommand;		
	// 		}
	// 	}		
	// };
	if (message.content.startsWith(config.prefix)) { //Comandos que empiezan por el prefijo
		const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		if (command == 'berenjena' && args == 'on'){
			berenjena = true;
		}
		if (command == 'berenjena' && args == 'off'){
			berenjena = false;
		}
		console.log(command);
		try {
			let commandFile = require(`./comandos/${command}.js`);
			commandFile.run(discBot, message, args);
		} catch (err) {
			console.error(err);
		}
	}

	if (message.content.toLowerCase().startsWith('choribot')) { //Comandos conversacionales
		
		const command = message.content.toLowerCase();
		
		switch (command) {
			case 'choribot, estas ahi?':
				message.channel.send('Si señor '+message.author+' , me encuentro en tu mismo plano', {tts: true});
			break;
			
			
			case 'choribot prueba':
				message.channel.send(message.channel.id);
			break;
			// Mas conversaciones
		}
	}
}

function resetCon(){
	lastUserC=0;
	lastUserD=0;
}

function escribirU(discBot){
	var buf = discBot.channels.find('name','Mercado de la Sal').members.array();
	if(buf.length == 0){
		fs.writeFile('./conectados', '', function (err) {
			if (err) return console.log(err);
		});
	}
	for (var i=0; i<buf.length; i++){
		fs.writeFile('./conectados', '', function (err) {
			if (err) return console.log(err);
		});
		fs.appendFile('./conectados', buf[i].user.username+'\n', function (err) {
			if (err) return console.log(err);
		});
	}
	var spawn = require('child_process').spawn,
	ls    = spawn('cmd.exe', ['/c', 'subir.bat']);
}

