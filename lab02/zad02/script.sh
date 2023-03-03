#!/bin/bash

docker build -t json-date .

docker run -d -p 8080:8080 json-date
