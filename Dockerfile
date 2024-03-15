FROM node:21.6.1

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
