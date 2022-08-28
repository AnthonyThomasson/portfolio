FROM node:latest as server-build
RUN mkdir -p /build
COPY server/tsconfig.json ./build
COPY server/package.json server/yarn.lock server/.yarnrc.yml server/.yarnrc ./build/
COPY server/.yarn ./build/.yarn
COPY server/src ./build/src
WORKDIR /build
RUN yarn && yarn build

FROM node:latest as client-build
COPY client/package.json client/yarn.lock client/tsconfig.json client/tsconfig.node.json ./
COPY client/index.html .
COPY client/src src
RUN npm i && npm run build

FROM node:alpine
COPY --from=server-build ./build/dist  ./app
COPY --from=server-build ./build/node_modules  ./app/node_modules
COPY --from=client-build ./dist  ./app/public
COPY wait-for-postgres.sh .
RUN chmod +x wait-for-postgres.sh

RUN apk --update add postgresql-client

EXPOSE $PORT

ENTRYPOINT ["./wait-for-postgres.sh", "node","./app/index.js" ]