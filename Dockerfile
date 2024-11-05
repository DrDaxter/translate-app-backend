FROM node:alpine3.19 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

#stage 2

FROM node:alpine3.19 AS prod

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --prod

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD [ "node","dist/main" ]