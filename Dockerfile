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

# COPY --from=server-build ./build  ./app/server
# COPY --from=client-build ./build  ./app/client

COPY --from=server-build ./build/dist/* ./app/
COPY --from=server-build ./build/node_modules ./app/node_modules
COPY --from=client-build ./build/dist  ./app/public

COPY wait-for-postgres.sh ./app
RUN chmod +x ./app/wait-for-postgres.sh

RUN apk --update add postgresql-client

EXPOSE $PORT

ENTRYPOINT ["./app/wait-for-postgres.sh", "node","./app/index.js" ]