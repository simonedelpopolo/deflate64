FROM node:16.13.1-bullseye-slim

WORKDIR ~

RUN npm i -g deflate64

ENTRYPOINT ["/bin/bash"]
