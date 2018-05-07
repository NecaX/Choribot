# Choribot

## Introducción

Este bot esta pensado para ser usado en la comunidad de Discord Chorizolandia V2. Acutalmente esta en versión Alpha, dado que acabo de 
empezar a trabajar en él. 

## Versiones

> ### Alpha 0.0.3 - 13/09/2017
	- Creacion del bot, utilizando discord.js.
	- Integración del comando $Ping, $Ayuda, $About, $Reacciones, $Presentacion, $Decir.
	- Reacciones a algunas frases (Actualmente escasas). Se pueden ver con $Reacciones.
	
> ### Alpha 0.0.4
	- Separación de los comandos en archivos propios.
	- Se ha añadido el comando $Dado (num)d(num).
	
> ### Alpha 0.0.5
	- Se ha añadido el comando $Sugerencia.
	- Se han añadido los comandos $Canta y $Callate para conectar el bot al canal de voz y que cante/deje de cantar.
	
> ### Alpha 0.0.6
	- Se han modificado los comandos $Canta y $Callate, ahora es un solo comando $Musica que de momento reproduce una canción, en futuras actualizaciones reproducirá una canción aleatoria de una carpeta.
	- Se ha comenzado a implementar el comando $Busca, que tendrá como finalidad reproducir el audio de un video de youtube. De momento solo reproduce el audio de un video.

> ### Alpha 0.0.7
	- Se ha finalizado el comando $Musica, ahora te permite poner, quitar o cambiar de canción de forma aleatoria de la carpeta de musica que se encuentra en la raiz del proyecto.
	- Ahora el bot te da la bienvenida cuando entras al canal de voz principal.

> ### Alpha 0.0.7
	- Se ha incluido el comando $Musica buscar que permite buscar una canción específica de la carpeta música.
	- Se ha incluido el comando $Musica lista que te envia por privado la lista de canciones disponibles.
	- Se han añadido en la raiz del proyecto unos ejecutables para lanzar el bot sin necesidad de entrar en la consola.
	- Mejora del comando $Ayuda para evitar flood de mensajes.
	- Mejora del comando $Reacciones.
	- Se ha incluido el comando $Verid para el adminsitrador que permite ver el id de un canal.

> ### Beta 0.1
	-Primera beta del bot, alcanzamos este estado porque creo que el bot ya tiene unas funcionalidades básicas suficientes para resultar de alguna utilidad.
	-Interconexión Discord-Telegram. Choribot ha decidio viajar al mundo de la multiplataforma, conectando mensajes de un chat de Telegram con un canal de texto de Discord, en ambas direcciones.
	-Se ha integrado un WebHook en el canal de discord (Esto no aparece en el código, pero se da como sugerencia para ver actualizaciones del bot).

>### Beta 0.2
	-Implementación del comando $Llamar [nombre], que manda mensajes a un usuario por privado hasta que recibe el comando $Llamar Parar.

>### Beta 0.3
	-Solución de errores del comando $Llamar, ahora para el envio de mensajes cuando se ejecuta el comando $Llamar parar correctamente.
	-Ahora el bot tiene estado cuando arranca.
	-Se ha creado el fichero Inicio.js que se ejecuta cuando se inicia el bot, por si fuera necesario hacer más cosas en este momento.

## Proximas implementaciones
	- Comando $Llamar con @usuario
	- Documentar la instalación del bot
	- Comando $Insultar