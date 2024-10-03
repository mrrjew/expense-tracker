FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:20-alpine 

WORKDIR /app

COPY package*.json ./

RUN yarn install --production

COPY --from=build /app/dist ./

CMD [ "node", "dist/main" ]