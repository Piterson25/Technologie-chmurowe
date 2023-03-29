# Etap 1
FROM ubuntu:latest as build
RUN apt-get update && apt-get install -y curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
WORKDIR /app
COPY ./app /app
RUN npm install
CMD ["npm", "start"]

# Etap 2
FROM nginx:latest
COPY nginx/nginx.conf /etc/nginx/conf.d/
COPY --from=build /app /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
