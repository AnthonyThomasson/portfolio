FROM node:latest as backend-build
COPY backend/package.json backend/package-lock.json backend/tsconfig.json ./
COPY backend/src src
RUN npm install && npm run build

FROM node:latest as frontend-build
COPY frontend/package.json frontend/package-lock.json frontend/tsconfig.json ./
COPY frontend/public public
COPY frontend/src src
RUN npm install && npm run build

FROM node:alpine
COPY --from=backend-build ./dist  ./app
COPY --from=backend-build ./node_modules  ./app/node_modules
COPY --from=frontend-build ./build  ./app/public
COPY wait-for-postgres.sh .
RUN chmod +x wait-for-postgres.sh

RUN apk --update add postgresql-client

EXPOSE $PORT

ENTRYPOINT ["./wait-for-postgres.sh", "node","./app/index.js" ]