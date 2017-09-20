exports.run = (client, message, args) => {
    let text = args.slice(0).join(" ");
	message.delete();
	message.channel.send(text, {tts: true}).catch(console.error);
}