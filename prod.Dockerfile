FROM node:latest as server-build
COPY server/tsconfig.json ./build
COPY server/package.json server/yarn.lock server/.yarnrc.yml server/.yarnrc ./build/
COPY server/.yarn build/
COPY server/src build

WORKDIR /build
RUN yarn && yarn build

FROM node:latest as client-build
COPY client/package.json client/package-lock.json client/tsconfig.json ./
COPY client/public public
COPY client/src src
RUN npm install && npm run build


FROM node:alpine
COPY --from=server-build ./build/dist  ./app
COPY --from=server-build ./build/node_modules  ./app/node_modules
COPY --from=client-build ./build  ./app/public
COPY wait-for-postgres.sh .
RUN chmod +x wait-for-postgres.sh

RUN apk --update add postgresql-client

EXPOSE $PORT

ENTRYPOINT ["./wait-for-postgres.sh", "node","./app/index.js" ]