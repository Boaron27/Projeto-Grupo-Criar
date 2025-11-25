FROM node:20

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json

RUN npm install esbuild@latest

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
