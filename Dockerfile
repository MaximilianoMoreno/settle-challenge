FROM alpine:3.12.1
RUN apk update && apk upgrade
RUN apk add --update nodejs nodejs-npm 
RUN rm -rf /var/cache/apk/*

COPY . /src
RUN cd /src; npm install
EXPOSE 8000
CMD ["node", "/src/server.js"]