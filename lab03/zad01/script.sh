#!/bin/bash

docker build -t nginx .

docker run -d -p 8080:80 -v ${pwd}:/usr/share/nginx/html nginx
