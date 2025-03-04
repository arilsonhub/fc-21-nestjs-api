ARG appDir=/home/node/app

FROM node:23.6.1-slim AS build

WORKDIR ${appDir}

COPY . .

RUN apt update && \
    apt install openssl procps -y && \
    npm install

FROM build as api

WORKDIR ${appDir}

COPY --from=build ${appDir} .

CMD [ "npm", "run", "start:dev" ]

FROM build as kafka

WORKDIR ${appDir}

COPY --from=build ${appDir} .

CMD ["npm", "run", "start:dev", "--", "--entryFile", "cmd/kafka.cmd"]

FROM build as cdn

WORKDIR ${appDir}

COPY --from=build ${appDir} .

CMD ["npm", "run", "assets-image"]