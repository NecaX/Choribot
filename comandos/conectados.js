exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna"].includes(r.name)) ) {
                const fs = require('fs');
                var buf = fs.readFileSync('./conectados', 'utf8');   
                console.log(buf)
                if(buf == ''){
                        message.channel.send('No hay usuarios conectados').catch(console.error);
                } else{
                        message.channel.send('Usuarios conectados:\n'+buf).catch(console.error);
                }
        } else {
                message.channel.send('No tienes privilegios suficientes').catch(console.error);
	}
}