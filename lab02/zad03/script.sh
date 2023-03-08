#!/bin/bash

docker build -t zad3 .

docker run -d -p 8080:8080 --link mongodb:mongodb zad3