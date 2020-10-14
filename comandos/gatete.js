const fetch = require("node-fetch");
// TODO: UNTESTED
exports.run = (client, message, args) => {
    fetch('https://api.thecatapi.com/v1/images/search', {
          method: 'GET',
          headers: {
            'x-api-key': '6efc7324-7195-4db1-accc-328020dd0e8f'
          }
        }).then(response => response.json())
          .then(json=>{
            message.channel.send("Aqui tienes tu gatete", {files: [json[0].url]}).catch(console.error);
          })
}