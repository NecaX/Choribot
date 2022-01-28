"use strict";

//General
const path = require("path");
var childProcess = require('child_process');
const util = require('util')




//alrm = setInterval(function(){resetCon()},15000); //Resetear conexiones
var lastUserC = 0 // Ultimo usuario en conectarse
var lastUserD = 0 // Ultimo usuuario en desconectarse
var off = 0; //musica
var llamarp = 0; //llamar
global.alarmas
const fs = require('fs');
var http = require('http');
var berenjena = false;
const { Client, Collection, Intents, Activity } = require('discord.js');
const { token } = require('./config.json');
const config = require("./config.json");
const discBot = new Client({ 
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
});

discBot.commands = new Collection();
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./comandos/${file}`);
	discBot.commands.set(command.data.name, command);
	console.log(`Comando ${command.data.name} cargado`);
}


discBot.once('ready', () => {
	console.log("En marcha!");
	discBot.user.setActivity('tocar los cojones', { type: 'PLAYING' })
	require('child_process').fork('register.js')
	
});


discBot.on("guildMemberAdd", (member) => {
  console.log(`Nuevo Usuario "${member.user.username}" Ha entrado a "${member.guild.name}"` );
  
  discBot.channels.cache.find(val => val.name === 'patalking').send(member.user.username+' ha entrado al servidor', {tts: true});
});



// discBot.on("message", async (message) => {
// 	if(berenjena == true){
// 		message.react('🍆').catch(console.error);
// 	}node b
// 	//ejecutarcomandos(message);	
// });

// discBot.on("messageUpdate", (oldMessage, newMessage) => {
// 	//ejecutarcomandos(newMessage);
// });

discBot.on('voiceStateUpdate', async (olduser, newuser) => { //Indica que alguien se ha conectado al canal de voz principal
	try{
		// console.log("Old:\n")
		// console.log(olduser.channel)
		// console.log("\n----------------------------------------------\n")
		// console.log("new:\n")
		// console.log(newuser.channel)
		if(newuser.channel == null && (olduser.channel.id == '294922283942674444' || olduser.channel.id == '294928756722630656' || olduser.channel.id == '294943063145578506')){
			discBot.channels.fetch('294922283942674443').then(channel => channel.send({content: olduser.member.user.username+' Se ha desconectado', tts: true}).then(message => setTimeout(() => message.delete(), 5000)));
			lastUserD = olduser.id;
			console.log("disc")
		}
		if(newuser.channel != null){
			if((newuser.channel.id == '294922283942674444' || newuser.channel.id == '294928756722630656' || newuser.channel.id == '294943063145578506') && olduser.channel == null){
				if(newuser.member.user.username == 'Iceword01'){
					discBot.channels.fetch('294922283942674443').then(channel => channel.send({content: 'Javo se ha conectado', tts: true}).then(message => setTimeout(() => message.delete(), 5000)));
				} else{
					discBot.channels.fetch('294922283942674443').then(channel => channel.send({content: newuser.member.user.username+' Se ha conectado', tts: true}).then(message => setTimeout(() => message.delete(), 5000)));
				}
				lastUserC = newuser.id;
				console.log("conn")
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

discBot.on('interactionCreate', async interaction => {
	console.log(`${interaction.user.tag} en #${interaction.channel.name} ha comenzado la interacción /${interaction.command}`);
	try{
		if(interaction.isButton()){
			const filter = i => i.customId === `Alarma`;
			const collector = await interaction.channel.createMessageComponentCollector({ filter, time: 150000 });
			collector.on('collect', m => {
				clearInterval(alarmas);
				return m.update({ content: `Se ha parado de llamar al usuario`, components: [] });
			});
			collector.on('end', collected => console.log(`Collected ${collected.size} items`));
		}else if(interaction.isCommand()){
			const command = discBot.commands.get(interaction.commandName);
			if (!command) return;
	
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: 'Ha habido un error ejecutando este comando.', ephemeral: true });
			}
		}else if(interaction.isContextMenu()){
			console.log("La interacción es un Context Menu")
		}else if(interaction.isMessageComponent()){
			console.log("La interacción es un Message Component")
		}else{
			console.log(interaction)
			return
		}
	}catch(e){
		console.log(e)
	}
	
});


discBot.login(token);

function resetCon(){
	lastUserC=0;
	lastUserD=0;
}
