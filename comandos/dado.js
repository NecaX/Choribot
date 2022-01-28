const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dado')
		.setDescription('Lanzo un dado.')
		.addIntegerOption(option => option.setName("caras").setDescription('Numero de caras del dado.').setRequired(true))
		.addIntegerOption(option => option.setName("número").setDescription('Numero de dados a lanzar.').setRequired(true)),
	async execute(interaction) {
		var num = interaction.options.getInteger("número")
		var str = interaction.options.getInteger("caras")

		if(num>999 || str>999) return interaction.reply("Los números introducidos son demasiado grandes.")
		
		var aleatorio = Math.floor((Math.random() * str) + 1); //Numero aleatorio entre 1 y las caras que tenga el dado, guardado en la variable aleatorio
		var tot = aleatorio;
		if(num > 1){
			mostrar = aleatorio+' + ';
			for(i=0;i<num-1;i++){
				aleatorio = Math.floor((Math.random() * str) + 1);
				tot = tot+aleatorio;
				mostrar = mostrar.concat(aleatorio+' + ');
			}
		
			aleatorio = Math.floor((Math.random() * str) + 1);
			tot = tot+aleatorio;
		}else{
			mostrar = ""
		}
		mostrar = mostrar.concat(aleatorio+'  = ');
		
		return interaction.reply('He tirado '+num+' veces el dado de '+str+' caras y he obtenido lo siguiente:\n'+mostrar+' '+tot);
	},
};