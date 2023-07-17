// exports.run = (client, message, args) => {
// 	if(message.member.roles.cache.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna"].includes(r.name)) ) {
// 		const user = message.mentions.users.first();
// 		const amount = (!!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])) + 1
// 		if (!amount) return message.reply('tienes que indicar cuantos mensajes borrar');
// 		if (!amount && !user) return message.reply('tienes que indicar cuantos mensajes borrar y/o un usuario');
// 		if (amount > 15 && !message.member.roles.cache.some(r=>["Señor total del universo"].includes(r.name))) return message.reply('Demasiados mensajes, no la lies tanto');
// 		message.channel.messages.fetch({
// 			limit: amount,
// 		}).then((messages) => {
// 			if (user) {
// 				const filterBy = user ? user.id : Client.user.id;
// 				messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
// 			}
// 			message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
// 		});
// 	} else {
// 		message.channel.send('No tienes privilegios suficientes').catch(console.error);
// 	}
// }

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('borrar')
		.setDescription('Para borrar una cantidad X de mensajes en general o de un usuario concreto.')
		.addIntegerOption(option => option.setName("numero").setDescription('Numero de mensajes que deseas borrar.').setRequired(true))
		.addUserOption(option => option.setName("usuario").setDescription('El usuario del que quieres borrar los mensajes.')),
	async execute(interaction) {
		usuario = interaction.options.getUser("usuario")
		cantidad = interaction.options.getInteger("numero")
		if (cantidad > 15) return interaction.reply({ content: "Demasiados mensajes, no la lies tanto", ephemeral: true });

		interaction.channel.messages.fetch({
			limit: cantidad,
		}).then((messages) => {
			if (usuario) {
				const filterBy = usuario ? usuario.id : interaction.user.id;		
				messages = messages.filter(m => m.author.id === filterBy);
			}
			interaction.channel.bulkDelete(messages).catch(error => console.log(error.stack));
		});
		return interaction.reply({ content: `Has borrado ${cantidad} mensaje/s`, ephemeral: true });
	},
};