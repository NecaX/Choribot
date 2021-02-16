"use strict";

//General
const path = require("path");



alrm = setInterval(function(){resetCon()},15000); //Resetear conexiones
var lastUserC = 0 // Ultimo usuario en conectarse
var lastUserD = 0 // Ultimo usuuario en desconectarse
var off = 0; //musica
var llamarp = 0; //llamar
var alrm = null;
const fs = require('fs');
var http = require('http');
var berenjena = false;

const Discord = require("discord.js");
const discBot = new Discord.Client();
const config = require("./config.json");

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
  
  discBot.channels.cache.find(val => val.name === 'patalking').send(member.user.username+' ha entrado al servidor', {tts: true});
});



discBot.on("message", async (message) => {
	if(berenjena == true){
		message.react('🍆').catch(console.error);
	}
	ejecutarcomandos(message);	
});

discBot.on("messageUpdate", (oldMessage, newMessage) => {
	ejecutarcomandos(newMessage);
});


discBot.on("voiceStateUpdate", (olduser,newuser) => { //Indica que alguien se ha conectado al canal de voz principal
	// console.log(olduser)
	// console.log(olduser.channel)	
	try{
		if(newuser.channel == null && (olduser.channel.id == '294922283942674444' || olduser.channel.name == 'Callejon de los negros' || olduser.channel.name == 'Las puertas')){
			discBot.channels.fetch('294922283942674443').then(channel => channel.send(olduser.member.user.username+' Se ha desconectado', {tts: true}).then(message => message.delete({ timeout: 3000 })));
			lastUserD = olduser.id;
		}
		if(newuser.channel != null){
			if((newuser.channel.id == '294922283942674444' || newuser.channel.name == 'Callejon de los negros' || olduser.channel.name == 'Las puertas') && olduser.channel == null){
				if(newuser.member.user.username == 'Iceword01'){
					discBot.channels.fetch('294922283942674443').then(channel => channel.send('Javo se ha conectado', {tts: true}).then(message => message.delete({ timeout: 3000 })));
				} else{
					discBot.channels.fetch('294922283942674443').then(channel => channel.send(newuser.member.user.username+' Se ha conectado', {tts: true}).then(message => message.delete({ timeout: 3000 })));
				}
				lastUserC = newuser.id;
			}
			//SEERVIDOR DE PRUEBAS
			// if(discBot.channels.cache.find(val => val.id == '294922283942674444').members.array().length == 1 && newuser.channel.name == 'Chorizo TV' && (olduser.voice.channel == null || olduser.voice.channel.name != 'Chorizo TV')){
			// 	lastUserC = newuser.id;
			// }
		}
	} catch (err){
		console.log(err)
	}
	
});

discBot.login(config.token);

//funciones

function ejecutarcomandos(message){
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
			console.error("El comando %s no existe",command);
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
