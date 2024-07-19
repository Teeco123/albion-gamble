FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm i --force

COPY . .

RUN npm run build

COPY package*.json ./build

WORKDIR /app/build

RUN npm ci --force --omit dev

WORKDIR /app

EXPOSE 3000

CMD node -r dotenv/config server.js