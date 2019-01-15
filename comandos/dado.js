exports.run = (client, message, args) => {
	if (args[0] != null) {
		var str = args[0].toLowerCase();
		var patt = /^[1-9][0-9]*d[1-9][0-9]*$/ //Patron que comprueba que el dado introducido es correcto
		var mostrar = '';
		if (!patt.test(str)) {
			message.channel.send('Dado invalido, el comando es $dado (numero de dados)d(caras del dado)');
		} else { //Si el dado es correcto
			var num = str.slice(0,1); //Variable num, coge el primer numero del array pasado
			str = str.slice(1); //Elimina del array el primer numero, que guardamos en la variable num. Al final esta varible tendra las veces que se tira el dado
				while (str.slice(0,1) != 'd'){ //Mientras queden numeros antes de la d, se iran quitando numeros de str y concatenandolos a num
					num = num.concat(str.slice(0,1));
					str = str.slice(1);
				}
				str = str.slice(1); //Se elimina la d, dejando en str las caras del dado
				
				var aleatorio = Math.floor((Math.random() * str) + 1); //Numero aleatorio entre 1 y las caras que tenga el dado, guardado en la variable aleatorio
				var tot = aleatorio;
				if(num>1){
					mostrar = aleatorio+' + ';
					for(i=1;i<num-1;i++){
						aleatorio = Math.floor((Math.random() * str) + 1);
						tot = tot+aleatorio;
						mostrar = mostrar.concat(aleatorio+' + ');
					}
				
					aleatorio = Math.floor((Math.random() * str) + 1);
					tot = tot+aleatorio;
				}
				mostrar = mostrar.concat(aleatorio+'  = ');
				
				message.channel.send('He tirado '+num+' veces el dado de '+str+' caras y he obtenido lo siguiente:');
				message.channel.send(mostrar+' '+tot);
		}
	} else {
		message.channel.send('No has introducido ningun argumento').catch(console.error);;
	}
}; 