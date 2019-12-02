"use strict";

//General
const path = require("path");
const git = require("./lib/pull")


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
  
  discBot.channels.find(val => val.name === 'patalking').send(member.user.username+' ha entrado al servidor', {tts: true});
});



discBot.on("message", (message) => {
	git.pull()
	if(message.author.bot == true && message.author.username == 'GitHub' && message.content.includes('[Choribot:master]')){

	}
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
		discBot.channels.find(val => val.name === 'patalking').send(olduser.user.username+' Se ha desconectado', {tts: true});
		discBot.channels.find(val => val.name === 'patalking').bulkDelete(1);		
		lastUserD = olduser.id;
	}
	if(newuser.voiceChannel != null){
		if((newuser.voiceChannel.name == 'Mercado de la Sal' || newuser.voiceChannel.name == 'Callejon de los negros' || olduser.voiceChannel.name == 'Las puertas') && olduser.voiceChannel == null){
			if(newuser.user.username == 'Iceword01'){
				discBot.channels.find(val => val.name === 'patalking').send('Javo se ha conectado', {tts: true});
			} else{
				discBot.channels.find(val => val.name === 'patalking').send(newuser.user.username+' Se ha conectado', {tts: true});
			}
			discBot.channels.find(val => val.name === 'patalking').bulkDelete(1);
			lastUserC = newuser.id;
		}
		if(discBot.channels.find(val => val.name === 'Mercado de la Sal').members.array().length == 1 && newuser.voiceChannel.name == 'Chorizo TV' && (olduser.voiceChannel == null || olduser.voiceChannel.name != 'Chorizo TV')){
			lastUserC = newuser.id;
		}
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

