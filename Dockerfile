FROM node:latest as server-build
COPY server/tsconfig.json server/package.json server/yarn.lock server/.yarnrc.yml server/.yarnrc build/
COPY server/src build/src
COPY server/.yarn build/.yarn
COPY server/prisma build/prisma
WORKDIR /build
RUN yarn && yarn build

FROM node:latest as client-build
COPY client/index.html client/vite.config.ts client/package.json client/yarn.lock client/tsconfig.json client/tsconfig.node.json ./build/
COPY client/src build/src
WORKDIR /build
RUN yarn && yarn build

FROM node:alpine

COPY --from=server-build build/  app/
COPY --from=client-build build/dist  app/dist/src/public
COPY --from=client-build build/dist  app/dist/src/public

RUN apk --update add postgresql-client
COPY deployments/wait-for-postgres.sh app
RUN chmod +x app/wait-for-postgres.sh

EXPOSE $PORT

WORKDIR /app
ENTRYPOINT ["./wait-for-postgres.sh", "yarn", "start" ]