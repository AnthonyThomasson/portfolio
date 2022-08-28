FROM node:latest as server-build
COPY server/tsconfig.json ./
COPY server/package.json server/yarn.lock server/.yarnrc.yml server/.yarnrc ./
COPY server/.yarn .yarn
COPY server/src src
RUN yarn && yarn build

FROM node:latest as client-build
COPY client/package.json client/package-lock.json client/tsconfig.json ./
COPY client/public public
COPY client/src src
RUN npm install && npm run build


FROM node:alpine
COPY --from=server-build ./dist  ./app
COPY --from=server-build ./node_modules  ./app/node_modules
COPY --from=client-build ./build  ./app/public
COPY wait-for-postgres.sh .
RUN chmod +x wait-for-postgres.sh

RUN apk --update add postgresql-client

EXPOSE $PORT

ENTRYPOINT ["./wait-for-postgres.sh", "node","./app/index.js" ]