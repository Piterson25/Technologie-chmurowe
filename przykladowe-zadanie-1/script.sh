#!/bin/bash

IMAGE_NAME="my-app"
GIT_REPO="https://github.com/Piterson25/React_test"

cat <<EOF > Dockerfile-dev
FROM alpine
RUN apk --no-cache add curl git npm
ARG GIT_REPO
RUN git clone ${GIT_REPO} /app
WORKDIR /app/react_app
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
EOF

docker build --build-arg GIT_REPO=${GIT_REPO} -t ${IMAGE_NAME}-dev -f Dockerfile-dev .

cat <<EOF > default.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files \$uri /index.html;
    }
}
EOF

cat <<EOF > Dockerfile-app
FROM nginx
COPY --from=${IMAGE_NAME}-dev /app/react_app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
EOF

docker build -t ${IMAGE_NAME} -f Dockerfile-app .

docker network create app_network

docker run -d --network app_network -p 3000:3000 --name ${IMAGE_NAME}-dev ${IMAGE_NAME}-dev
docker run -d --network app_network -p 8080:80 --name ${IMAGE_NAME} ${IMAGE_NAME}
