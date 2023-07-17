exports.run = (client, message, args) => {
	const fs = require('fs');
	if (args[0] != null) {
		var fichname = './sugerencias/' + message.createdTimestamp + ' - ' + message.author.username + '.txt'
		let text = args.slice(0).join(" ");
		fs.writeFile(fichname, text, function (err) {
			if (err) return console.log(err);
			message.channel.send('Sugerencia enviada').catch(console.error);;
		});
	} else {
		message.channel.send('No has introducido ningun mensaje').catch(console.error);;
	}
};