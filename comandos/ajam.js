const fetch = require("node-fetch");
exports.run = (client, message, args) => {
  message.channel.send({files: ['https://media1.tenor.com/images/47868dea26e2a1a71dab795bf19fcb94/tenor.gif?itemid=8176035']}).catch(console.error);
}