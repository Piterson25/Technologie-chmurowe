#!/bin/bash

RESPONSE=$(curl -s http://localhost:8080/)
if [[ -n $RESPONSE ]]; then
  echo "Test passed"
else
  echo "Test failed, response: '$RESPONSE'"
fi
