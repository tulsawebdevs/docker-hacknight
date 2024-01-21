# Backend build
FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

ARG NODE_ENV=production
ARG ENV=local

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
