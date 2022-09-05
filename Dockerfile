FROM node:latest as server-build
COPY server/tsconfig.json build/
COPY server/package.json server/yarn.lock server/.yarnrc.yml server/.yarnrc build/
COPY server/.yarn build/.yarn
COPY server/src build/src
WORKDIR /build
RUN yarn && yarn build

FROM node:latest as client-build
COPY client/index.html client/vite.config.ts client/package.json client/yarn.lock client/tsconfig.json client/tsconfig.node.json ./build/
COPY client/src build/src
WORKDIR /build
RUN yarn && yarn build

FROM node:alpine

COPY --from=server-build ./build/dist/* ./app/
COPY --from=server-build ./build/node_modules ./app/node_modules
COPY --from=client-build ./build/dist  ./app/public

RUN apk --update add postgresql-client
COPY ./db/postgres-setup.sh ./app/db/postgres-setup.sh
COPY ./db/seeds ./app/db/seeds
RUN chmod +x ./app/db/postgres-setup.sh

EXPOSE $PORT

ENTRYPOINT ["./app/db/postgres-setup.sh", "node","./app/index.js" ]