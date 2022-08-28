FROM node:latest as backend-build
COPY backend/package.json backend/yarn.lock backend/tsconfig.json ./out/
COPY backend/src out/src

WORKDIR /out
RUN yarn && yarn build

FROM node:latest as frontend-build
COPY frontend/index.html frontend/package.json frontend/yarn.lock frontend/tsconfig.json frontend/tsconfig.node.json ./
COPY frontend/src src
RUN yarn && yarn build

FROM node:alpine

COPY --from=backend-build ./out  ./app
COPY --from=frontend-build ./dist  ./app/dist/public

COPY wait-for-postgres.sh ./app
RUN chmod +x ./app/wait-for-postgres.sh
RUN apk --update add postgresql-client npm

EXPOSE $PORT

WORKDIR /app

ENTRYPOINT ["npm","run", "dev" ]