FROM node:19.6.1-bullseye as server
COPY server build
WORKDIR /build
RUN yarn install --frozen-lockfile && yarn build

FROM node:19.6.1-bullseye as client
COPY client build
WORKDIR /build
RUN yarn install --frozen-lockfile && yarn build

FROM node:19.6.1-bullseye
COPY --from=server build/  app/
COPY --from=client build/dist  app/dist/src/public

RUN apt-get update && apt-get install -y postgresql-client
COPY deployments/scripts/wait-for-postgres.sh app
RUN chmod +x app/wait-for-postgres.sh

EXPOSE $PORT
WORKDIR /app
ENTRYPOINT ["./wait-for-postgres.sh"]