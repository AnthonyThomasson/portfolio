#!/bin/sh

# install client
apk --update add postgresql-client

# wait for postgres to be ready
until psql $DATABASE_URL -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
>&2 echo "Database connected - starting the app"
exec "$@"