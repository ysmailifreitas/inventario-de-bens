FROM node:21.6.1

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

RUN apt-get update && apt-get install -y dockerize

COPY . .

EXPOSE 4000

CMD ["dockerize", "-wait", "tcp://mysql:3306", "-timeout", "60s", "npm", "start"]