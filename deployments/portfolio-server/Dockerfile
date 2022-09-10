FROM node:latest as server-build
COPY server/tsconfig.json server/package.json server/yarn.lock server/.yarnrc.yml server/.yarnrc build/
COPY server/src build/src
COPY server/db/postgres-setup.sh build/db/postgres-setup.sh
COPY server/.yarn build/.yarn
COPY server/prisma build/prisma
WORKDIR /build
RUN yarn && yarn build

FROM node:alpine
COPY --from=server-build ./build/  ./app/
COPY --from=server-build ./build/db/postgres-setup.sh  ./app/db/postgres-setup.sh

RUN apk --update add postgresql-client
RUN chmod +x ./app/db/postgres-setup.sh

EXPOSE $PORT

WORKDIR /app

ENTRYPOINT ["./db/postgres-setup.sh", "yarn", "dev" ]