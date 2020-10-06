FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update  
RUN npm install uNetworking/uWebSockets.js#v17.3.0
RUN apt install ffmpeg -y --fix-missing
RUN npm install opusscript
RUN npm install mysql
RUN npm install

COPY . .

CMD ["node", "bot.js"]

