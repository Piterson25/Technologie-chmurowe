#!/bin/bash

docker volume create nginx_data
docker create --name nginx-app -v nginx_data:/data alpine
docker cp ./nginx_files/* nginx-app:/data
docker rm nginx-app

docker volume create nodejs_data
docker run --name node-app -d -p 8080:8080 -v nodejs_data:/app node
docker cp ./nodejs_files/* node-app:/app

docker volume create all_volumes
docker run -itd --name all-app -v nodejs_data:/nodejs -v all_volumes:/all -v nginx_data:/nginx alpine
docker exec -it all-app sh -c "cp -r /nodejs/* /all && cp -r /nginx/* /all"
docker container stop all-app
