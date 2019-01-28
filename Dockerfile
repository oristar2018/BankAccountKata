FROM node:10

WORKDIR /user/src/bank

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8887

CMD ["npm", "start"]

