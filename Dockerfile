FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update  
RUN apt-get install ffmpeg -y --fix-missing
RUN npm install

COPY . .

CMD ["node", "bot.js"]

