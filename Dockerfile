FROM node:16.14.0-bullseye-slim

WORKDIR ~

RUN npm i -g deflate64@2.1.21

ENTRYPOINT ["/bin/bash"]
