FROM node:14
WORKDIR /app
COPY package*.json ./
COPY default.conf /etc/nginx/conf.d/default.conf
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
