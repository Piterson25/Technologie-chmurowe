#!/bin/bash

echo 'const http = require("http"); http.createServer((req, res) => { res.write("Hello World"); res.end(); }).listen(8080);' > "$PWD/server.js"

docker run -p 8080:8080 -itd --rm -v "$PWD:/server" node:12 node /server/server.js
