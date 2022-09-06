#!/bin/sh
until psql $DATABASE_URL -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
  
>&2 echo "Postgres is up - seeding database"
yarn prisma generate
yarn prisma migrate reset --force
>&2 echo "Database seeded - starting the app"
exec "$@"