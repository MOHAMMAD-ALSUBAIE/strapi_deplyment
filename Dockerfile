# syntax=docker/dockerfile:1
FROM node:22-alpine
WORKDIR /opt/app
COPY . .
RUN npm ci
RUN npm run build
EXPOSE 1337
CMD ["npm","run","start"]
