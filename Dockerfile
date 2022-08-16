FROM node:latest as backend-build
COPY backend/package.json backend/package-lock.json backend/tsconfig.json ./
COPY backend/src src
RUN npm install && npm run build

FROM node:latest as frontend-build
COPY frontend/package.json frontend/package-lock.json frontend/tsconfig.json ./
COPY frontend/public public
COPY frontend/src src
RUN npm install && npm run build

FROM node:latest
COPY --from=backend-build ./dist  ./app
COPY --from=backend-build ./node_modules  ./app/node_modules
COPY --from=frontend-build ./build  ./app/public
EXPOSE 8080

ENTRYPOINT [ "node","./app/index.js" ] 