FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
COPY . .
EXPOSE 3621
CMD [ "node", "server.js" ]

# run image
# docker run -p 12345:3621 -d houta483/memory_practice_back_end

# Get container ID
# $ docker ps

# Print app output
# $ docker logs <container id>

# Example
# Running on http://localhost:8080

# Enter the container
# $ docker exec -it <container id> /bin/bash

# $ docker ps

# Example
# ID            IMAGE                                COMMAND    ...   PORTS
# ecce33b30ebf  <your username>/node-web-app:latest  npm start  ...   49160->8080

# $ curl -i localhost:49160

# HTTP/1.1 200 OK
# X-Powered-By: Express
# Content-Type: text/html; charset=utf-8
# Content-Length: 12
# ETag: W/"c-M6tWOb/Y57lesdjQuHeB1P/qTV0"
# Date: Mon, 13 Nov 2017 20:53:59 GMT
# Connection: keep-alive

# Hello world