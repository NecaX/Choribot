const fetch = require("node-fetch");
exports.run = (client, message, args) => {
  fetch('https://dog.ceo/api/breeds/image/random', {
    method: 'GET',
  }).then(response => response.json())
    .then(json=>{
      message.channel.send("Aqui tienes tu perrete", {files: [json.message]}).catch(console.error);
    })
}