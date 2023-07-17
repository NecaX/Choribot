exports.run = (client, message, args) => {
    message.channel.send('Hola '+message.author+', soy Choribot, tu nuevo compañero', {tts: true}).catch(console.error);
}