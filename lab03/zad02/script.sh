#!/bin/bash

docker build -t zad02 .

docker run -dp 8080:50 zad02
