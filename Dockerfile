FROM node:18-alpine

WORKDIR /app

COPY . /app
RUN npm install

RUN npm run build

ENTRYPOINT ["node"]
CMD ["dist/index.js"]