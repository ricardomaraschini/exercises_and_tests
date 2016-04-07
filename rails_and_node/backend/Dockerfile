FROM    centos:centos7
RUN	yum install -y epel-release
RUN     yum install -y nodejs npm
COPY	package.json /src/package.json
RUN	cd /src; npm install --production
COPY	. /src
CMD	["node", "/src/server.js"]
