FROM node:14

WORKDIR /app

COPY package* ./

COPY . .

RUN npm install

EXPOSE 3000

CMD npm start