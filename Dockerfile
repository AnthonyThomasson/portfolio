FROM node:20-bullseye as server
COPY server build
WORKDIR /build
RUN yarn install --frozen-lockfile && yarn build

FROM node:20-bullseye as client
COPY client build
WORKDIR /build
RUN yarn install --frozen-lockfile && yarn build

FROM node:20-bullseye
COPY --from=server build/  app/
COPY --from=client build/dist  app/dist/src/public

EXPOSE $PORT
WORKDIR /app