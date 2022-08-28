FROM node:latest as server-build
COPY server/tsconfig.json out/
COPY server/package.json server/yarn.lock server/.yarnrc.yml server/.yarnrc out/
COPY server/src out/src
COPY server/.yarn out/.yarn

WORKDIR /out
RUN yarn && yarn build

FROM node:latest as client-build
COPY client/index.html client/package.json client/yarn.lock client/tsconfig.json client/tsconfig.node.json ./
COPY client/src src
RUN yarn && yarn build

FROM node:alpine

COPY --from=server-build ./out  ./app
COPY --from=client-build ./dist  ./app/dist/public

COPY wait-for-postgres.sh ./app
RUN chmod +x ./app/wait-for-postgres.sh
RUN apk --update add postgresql-client npm

EXPOSE $PORT

WORKDIR /app

ENTRYPOINT ["npm","run", "dev" ]