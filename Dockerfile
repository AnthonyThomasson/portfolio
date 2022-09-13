FROM node:latest as server
COPY server build
WORKDIR /build
RUN yarn && yarn build

FROM node:latest as client
COPY client build
WORKDIR /build
RUN yarn && yarn build

FROM node:alpine
COPY --from=server build/  app/
COPY --from=client build/dist  app/dist/src/public

RUN apk --update add postgresql-client
COPY deployments/scripts/wait-for-postgres.sh app
RUN chmod +x app/wait-for-postgres.sh

EXPOSE $PORT
WORKDIR /app
ENTRYPOINT ["./wait-for-postgres.sh"]