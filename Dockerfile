FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install -g serve

CMD ["serve", "-s", "src", "-l", "3000"]