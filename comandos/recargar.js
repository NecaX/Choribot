exports.run = (client, message, args) => {
	if(!args || args.size < 1) return message.reply("Debes escribir el nombre del comando a recargar");
	delete require.cache[require.resolve(`./${args[0]}.js`)];
	message.reply(`El comando ${args[0]} se ha recargado`);
};