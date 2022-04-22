FROM node:16.14.2-alpine

WORKDIR ~

RUN npm i -g deflate64

ENTRYPOINT ["/bin/bash"]
