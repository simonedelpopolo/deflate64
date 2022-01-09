FROM node:16.13.1-bullseye-slim

WORKDIR ~

RUN npm i -g npm@8.3.0 \
    && npm i -g deflate64@2.1.8-beta

ENTRYPOINT ["/bin/bash"]