exports.run = (client) => {
	//Poner estado
	client.user.setActivity('tocar los cojones', { type: 'PLAYING' })
	.then(presence => console.log(`Actividad puesta a ${presence.game ? presence.game.name : 'jugando'}`))
	.catch(console.error);
}
