FROM node:15-alpine

WORKDIR /app
ADD . /app
RUN yarn --ci
