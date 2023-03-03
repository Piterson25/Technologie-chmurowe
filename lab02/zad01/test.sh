#!/bin/bash

RESPONSE=$(curl -s http://localhost:8080)
if [[ "$RESPONSE" == "Hello World" ]]; then
  echo "Test passed"
else
  echo "Test failed, response: '$RESPONSE'"
fi
