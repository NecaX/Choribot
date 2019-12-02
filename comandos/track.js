exports.run = (client, message, args) => {

	//By trackingmore
	function sentRes(url,data,method,fn){
		data=data||null;
		if(data==null){
			var content=require('querystring').stringify(data);
		}else{
			var content = JSON.stringify(data); //json format
		}
	
		var parse_u=require('url').parse(url,true);
		var isHttp=parse_u.protocol=='http:';
		var options={
			host:parse_u.hostname,
			port:parse_u.port||(isHttp?80:443),
			path:parse_u.path,
			method:method,
			headers:{
				'Content-Type':'application/json',
				'Content-Length':Buffer.byteLength(content,"utf8"),
				'Trackingmore-Api-Key':'06f99d7b-a7bf-434a-8895-c4abcbfb1153'
			}
		};
		var req = require(isHttp?'http':'https').request(options,function(res){
			var _data='';
			res.on('data', function(chunk){
				_data += chunk;
			});
			res.on('end', function(){
				fn!=undefined && fn(_data);
			});
		});
		req.write(content);
		req.end();
	}

	const command = args[0];

	switch (command) {
		case 'añadir':
			if(args[1] == ''){
				message.channel.send('No has indicado el identificador').catch(console.error);
				return
			}
			var trackingnumber = args[1]//"UX6CFH0441302990128903V"
			var postData = {"tracking_number":trackingnumber};
			var url = 'http://api.trackingmore.com/v2/carriers/detect';
			sentRes(url,postData,"POST",function(carriers){
					if(JSON.parse(carriers).meta.code == 200){ //Se han detectado transportistas

						for(i=0;i<JSON.parse(carriers).data.length;i++){

							var postData = {"tracking_number": trackingnumber,"carrier_code":JSON.parse(carriers).data[i].code};
							var url = 'http://api.trackingmore.com/v2/trackings/post';
							sentRes(url,postData,"post",function(track){		
							});
						}

					} else if(JSON.parse(carriers).meta.code == 4032){
						message.channel.send('No se ha detectado el transportista').catch(console.error);
						return;
					} else{
						message.channel.send('Eror '+JSON.parse(carriers).meta.code+': '+JSON.parse(carriers).meta.message).catch(console.error);
						return;
					}
			});
			
			var postData = {"tracking_number":trackingnumber};
			var url = 'http://api.trackingmore.com/v2/carriers/detect';
			sentRes(url,postData,"POST",function(carriers){
				if(JSON.parse(carriers).meta.code == 200){ //Se han detectado transportistas

					for(i=0;i<JSON.parse(carriers).data.length;i++){
						var postData = null;
						var url = 'http://api.trackingmore.com/v2/trackings/'+JSON.parse(carriers).data[i].code+'/'+trackingnumber+'/cn';
						sentRes(url,postData,"GET",function(data){
							if(JSON.parse(data).data.lastEvent == ''){
								var url = 'https://api.trackingmore.com/v2/trackings/'+JSON.parse(data).data.carrier_code+'/'+trackingnumber
								sentRes(url,postData,"DELETE",function(data){
									console.log("Borrado")
								});
							} else if(JSON.parse(data).data.lastEvent != '' && JSON.parse(data).data.lastEvent != 'undefined'){
								message.channel.send('Has empezado a seguir el paquete '+trackingnumber+'.').catch(console.error);
							}
						});
					}
				}
			});

		break

		case 'comprobar':


			if(args[1] == ''){
				message.channel.send('No has indicado el identificador').catch(console.error);
				return
			}
			var trackingnumber = args[1]//"UX6CFH0441302990128903V"
			var postData = {"tracking_number":trackingnumber};
			var url = 'http://api.trackingmore.com/v2/carriers/detect';
			sentRes(url,postData,"POST",function(carriers){
				if(JSON.parse(carriers).meta.code == 200){ //Se han detectado transportistas

					for(i=0;i<JSON.parse(carriers).data.length;i++){
						var postData = null;
						var url = 'http://api.trackingmore.com/v2/trackings/'+JSON.parse(carriers).data[i].code+'/'+trackingnumber+'/cn';
						sentRes(url,postData,"GET",function(data){
							console.log()
							if(JSON.parse(data).data.lastEvent != 'undefined'){
								message.channel.send('No se esta trackeando este paquete. Utiliza /track añadir [ID seguimiento]').catch(console.error);
								return
							}
							if(JSON.parse(data).data.lastEvent != '' && JSON.parse(data).data.lastEvent != 'undefined'){
								message.channel.send('Último mensaje: '+JSON.parse(data).data.lastEvent).catch(console.error);
								return
							}
						});
					}
				}
			});
		

		break
	}

	



	
}