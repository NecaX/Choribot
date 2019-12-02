exports.run = (client, message, args) => {
	if(message.member.roles.some(r=>["Señor total del universo", "Alto rango del infierno", "Alta ranga dela infierna", "Usuarios"].includes(r.name)) ) {
		if(message.member.voiceChannel){ //Se conecta al canal de voz del que lo llame
			const Discord = require("discord.js");
			const command = args[0];

			const path = require("path");
			const config = require("../config.json");

			var SpotifyWebApi = require('spotify-web-api-node');

			// var spotifyApi = new SpotifyWebApi({
			// 	clientId: '884f9dc830734489a4e04b62551b6695',
			// 	clientSecret: 'b8bb1783da4c46159adf8d21f9ffccb5',
			// 	redirectUri: 'http://www.michaelthelin.se/test-callback'
			// });
		
			var scopes = ['user-read-private', 'user-read-email'],
			redirectUri = 'https://example.com/callback',
			clientId = '5fe01282e44241328a84e7c5cc169165',
			state = 'some-state-of-my-choice';

			// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
			var spotifyApi = new SpotifyWebApi({
			redirectUri: redirectUri,
			clientId: clientId
			});

			// Create the authorization URL
			var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

			// https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
			console.log(authorizeURL);

			// clientId, clientSecret and refreshToken has been set on the api object previous to this call.
			spotifyApi.refreshAccessToken().then(
				function(data) {
				console.log('The access token has been refreshed!');
			
				// Save the access token so that it's used in future calls
				spotifyApi.setAccessToken(data.body['access_token']);
				},
				function(err) {
				console.log('Could not refresh access token', err);
				}
			);
			

			// Get Elvis' albums
			spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', { limit: 10, offset: 20 }, 
				function(err, data) {
					if (err) {
						console.error(err);
					} else {
						console.log(data.body);
					}
				}
			);
			// const streamOptions = { seek: 0, volume: 1 };
			// message.member.voiceChannel.join().then(connection => {
			// 	const stream = 
			// 	const dispatcher = connection.playStream(stream, streamOptions);
			// }).catch(console.error);

			
	
		}else{
			message.reply('Necesitas estar en un canal de voz primero');
		}
	} else {
		message.channel.send('No tienes privilegios suficientes').catch(console.error);
	}
}

