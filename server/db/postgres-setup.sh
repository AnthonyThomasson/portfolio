#!/bin/sh
# wait-for-postgres.sh

until psql $DATABASE_URL -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
  
>&2 echo "Postgres is up - seeding database"
DIR=$(dirname "$0")
psql $DATABASE_URL -f $DIR/seeds/init.sql

>&2 echo "Database seeded - starting the app"
exec "$@"