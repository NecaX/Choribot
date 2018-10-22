exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna"].includes(r.name)) ) {
        const fs = require('fs');
        var buf = fs.readFileSync('./conectados', 'utf8');   
        if(buf == null){
                message.channel.send('No hay usuarios conectados', {tts: true}).catch(console.error);
        } else{
            message.channel.send('Usuarios conectados:'+buf, {tts: true}).catch(console.error);
        }
	} else {
			message.channel.send('No tienes privilegios suficientes').catch(console.error);
	}
}