exports.run = (client, message, args) => {
	const fs = require('fs')
	const Discord = require("discord.js");
	const moment = require('moment');
	const schedule = require('node-schedule');
	var titulo
	var fecha
	var glob = false
	var admin = false

	const filter = m => m.author.id === message.author.id;

	if(message.member.roles.cache.some(r=>["Señor total del universo"].includes(r.name)) ) {
		admin=true
	}

	if (args[0] == 'crear') {
		message.channel.send('¡Hola!, vas a crear un recordatorio. Por favor, revisa tus mensajes directos');
		message.author.createDM().then((successMessage) => {
			const collector = successMessage.createMessageCollector(filter, {max: 2, time: 200000});
			var i = 0
			if(admin==false){
				successMessage.send('Bienvenido al sistema de creación de recordatorios de Choribot S.A. Por favor, dale un título. Siempre puedes cancelar este proceso escribiendo "cancelar".');
			}else{
				successMessage.send('Bienvenido señor. Por favor, dale un título al recordatorio. Puedes hacerlo global si el nombre acaba en /all. Siempre puedes cancelar este proceso escribiendo "cancelar".');
			}

			collector.on('collect', m => {
				
				if(m.content.toLowerCase() == 'cancelar'){
					successMessage.send('Recordatorio cancelado.')
			 		return;
				}
				if(i==0){
					if(admin==false){
						titulo = m.content
					}else{
						var dat = m.content.split("/")
						titulo = dat[0]
						for(var j=1;j<dat.length-1;j++){
							titulo = titulo+"/"+dat[j]
						}
						console.log(titulo)
						if(dat[dat.length-1].toLowerCase() == 'all'){
							glob = true
						}
					}
					
					successMessage.send('Por favor, indica la fecha del cordatorio en formato DD/MM/AAAA hh:mm, donde DD es día, MM es mes, AAAA es año, hh es hora y mm es minuto. Siempre puedes cancelar este proceso escribiendo "cancelar".');
				}
				if(i==1){
					fecha = m.content
					//Se crea el mensaje
					if(moment(fecha, "DD-MM-YYYY HH:mm").isValid()){
						const embed = new Discord.MessageEmbed() 
						.setTitle("Se ha creado el recordatorio con los siguientes datos:")
						.setAuthor(message.author.username, message.author.avatarURL)
						.setColor(0x8B0000)
						.setFooter("sistema de creación de recordatorios de Choribot S.A.", client.user.avatarURL)
						.setTimestamp()
						.addField("Título",
								titulo)
						.addField("Fecha del recordatorio",
								fecha)
						successMessage.send({embed}).catch(console.error)

						//Se guarda en un json
						let recordatorio = {
							titulo: titulo,
							fecha: fecha,
							global: glob
						};

						try {
							// convert JSON object to a string
							const data = JSON.stringify(recordatorio, null, 4);
						
							// write file to disk
							fs.writeFileSync('./recordatorios/'+moment().unix(), data, 'utf8');
						} catch (err) {
							console.log(`Error writing file: ${err}`);
						}

						reminders.createReminder(lists[0].id, {
							name: 'Call John',
							body: 'Catch up on the plan',
							remindMeDate: laterToday,
						});
						
						
					} else{
						successMessage.send("La fecha introducida no es válida. Por favor, cree un nuevo recordatorio e indique la fecha como indica el patrón del mensaje anterior.")
					}
				}
				i=i+1
			});

			//collector.on('end', collected => console.log('Has tardado demasiado tiempo en responder. Recordatorio cancelado1'));
		});
	}
	console.log("Comando finalizado")
};