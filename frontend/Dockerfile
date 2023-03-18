# Frontend build
FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY .eslintrc.cjs cypress.config.ts vite.config.ts tsoconfig.* ./
COPY public/ public/

ARG NODE_ENV=production
ARG ENV=local

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
