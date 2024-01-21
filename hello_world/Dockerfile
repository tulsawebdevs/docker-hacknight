FROM node:latest

# Set working dir
WORKDIR /app

# Copy manifest and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy remaining source code
COPY . .

ENV FORCE_COLOR=1

CMD ["node", "hello.js"]
