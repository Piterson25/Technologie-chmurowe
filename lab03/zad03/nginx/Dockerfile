FROM nginx
COPY ./default.conf /etc/nginx/conf.d/
COPY key.pem /etc/nginx/ssl/key.pem
COPY cert.pem /etc/nginx/ssl/cert.pem
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
