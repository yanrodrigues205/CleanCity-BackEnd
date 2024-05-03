FROM node:latest as base

RUN node -v

WORKDIR /home/node/ts/app

COPY package*.json ./
COPY .env ./

RUN npm install

COPY . .

ENV NODE_PATH=./build

FROM base as production

