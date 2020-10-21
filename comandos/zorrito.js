const fetch = require("node-fetch");
exports.run = (client, message, args) => {

  fetch('https://randomfox.ca/floof/', {
          method: 'GET',
        }).then(response => response.json())
          .then(json=>{
            console.log(json.image)
            message.channel.send("Aqui tienes tu zorrito", {files: [json.image]}).catch(console.error);
          })
}