exports.run = (client, message, args) => {
	message.channel.send({embed: {
		color: 3447003,
		title: "Comandos:",
		fields: [{
				name: "$Ping",
				value: "Para comprobar que sigo en el mismo plano que tú."
			},
			{
				name: "$Presentacion",
				value: "Como buen ciudadano, me presento."
			},
			{
				name: "$Reacciones",
				value: "Frases a las que reacciono."
			},
			{
				name: "$Decir",
				value: "Toma mi voz y hazla tuya."
			},
			{
				name: "$Dado [X]D[Y]",
				value: "Lanzo un dado de Y caras X veces."
			},
			{
				name: "$Borrar [@usuario] cantidad",
				value: "Para borrar una cantidad X de mensajes."
			},
			{
				name: "$Sugerencia",
				value: "Para enviar cualquier sugerencia para mi desarrollo."
			},
			{
				name: "$About",
				value: "Para saber cosas sobre mi creador y mi desarrollo."
			}
		],
		timestamp: new Date()					
		}
	});
};
