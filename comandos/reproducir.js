exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo"].includes(r.name)) ) {
		connection.playStream(myReadableStream);
		
		const dispatcher = connection.playFile('C:/Users/NecaX/Documents/GitHub/Choribot/musica/coches de choque.mp3');
		// const fs = require('fs');
		// const stream = fs.createReadStream('./musica/coches de choque.mp3');
		// connection.playStream(stream);
	} else {
		message.channel.send('No tienes privilegios suficientes').catch(console.error);
	}
}

//C:\Users\NecaX\Documents\GitHub\Choribot\musica