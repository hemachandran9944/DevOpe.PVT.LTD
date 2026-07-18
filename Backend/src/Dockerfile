
FROM node:20-alpine

WORKDIR /src/APIs/app

COPY package*.json ./

RUN npm install --production

COPY . . 

EXPOSE 5400

CMD ["node", "server.js"]