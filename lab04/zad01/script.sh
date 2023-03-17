#!/bin/bash

docker volume create nginx_data

docker run -d -p 80:80 --name mynginx -v nginx_data:/usr/share/nginx/html nginx
