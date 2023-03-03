#!/bin/bash

response=$(curl -s http://localhost:8080/)
expected="{\"date\":\"$(date '+%x')\",\"time\":\"$(date '+%X')\"}"
if [ "$response" == "$expected" ]; then
  echo "Test passed: Response is $response"
else
  echo "Test failed: Response is $response, expected $expected"
fi
