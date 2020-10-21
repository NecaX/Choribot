const fetch = require("node-fetch");
exports.run = (client, message, args) => {
  try {
    let animalicoFunctions = [
      require(`./perrete.js`),
      require(`./gatete.js`),
      require(`./zorrito.js`),
    ]
    let randomAnimalicoFunction = animalicoFunctions[Math.floor(Math.random() * animalicoFunctions.length)]
    randomAnimalicoFunction.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
}