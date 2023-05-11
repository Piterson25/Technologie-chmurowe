FROM node:14

WORKDIR /app

COPY package.json .
RUN npm install

COPY app.js .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

CMD [ "node", "app.js" ]