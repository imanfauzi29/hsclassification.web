# pull the base image
FROM node:12.18.3

RUN mkdir /app

# set the working direction
WORKDIR /app

# install app dependencies
COPY package.json /app

RUN npm install

# add app
COPY . /app

# build
RUN npm run build

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/build /usr/share/nginx/html