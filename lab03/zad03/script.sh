#!/bin/bash

mkdir -p app nginx

openssl req -x509 -newkey rsa:4096 -keyout nginx/key.pem -out nginx/cert.pem -days 365
openssl rsa -in nginx/key.pem -out nginx/key.pem

cat > nginx/default.conf <<EOF
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m inactive=60m;
proxy_cache_key "\$scheme\$http_host\$request_uri";

server {
    listen 80 ssl;

    server_name localhost;
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    location / {
        proxy_cache my_cache;
        proxy_pass http://my-node-app:3000;
        proxy_set_header Host \$http_host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        add_header X-Cache-Status \$upstream_cache_status;
        proxy_cache_valid 200 60m;
    }
}
EOF

cat > app/app.js <<EOF
const express = require('express');

const app = express();

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
EOF

cat > app/package.json <<EOF
{
  "name": "app",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2"
  }
}
EOF

cd app

cat > Dockerfile <<EOF
FROM node:latest
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "app.js" ]
EOF


docker build -t my-node-app  .
cd ..

cat > nginx/Dockerfile <<EOF
FROM nginx
COPY ./default.conf /etc/nginx/conf.d/
COPY key.pem /etc/nginx/ssl/key.pem
COPY cert.pem /etc/nginx/ssl/cert.pem
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF


cd nginx
docker build -t nginx .
cd ..

cd app
docker run -d --name my-node-app -p 3000:3000 my-node-app 
cd ..

cd nginx
docker run -d --name my-nginx-container -p 80:80 -p 443:443 --link my-node-app:my-node-app  nginx
docker exec my-nginx-container nginx -s reload
cd ..
