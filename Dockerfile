FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install npm@latest -g

RUN npm install

COPY . .

CMD ["node", "bot.js"]


