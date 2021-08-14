FROM node:16.6.2

WORKDIR /index.js

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD [ "run", "start" ]