. $(pwd)/.env.local

POSTGRES_USER=$(echo $DATABASE_URL | cut -d'/' -f3 | cut -d':' -f1)
POSTGRES_HOST=$(echo $DATABASE_URL | cut -d'/' -f3 | cut -d'@' -f2 | cut -d':' -f1)
POSTGRES_PORT=$(echo $DATABASE_URL | cut -d'/' -f3 | cut -d'@' -f2 | cut -d':' -f2)
POSTGRES_DB=$(echo $DATABASE_URL | cut -d'/' -f4)
echo "pg_isready -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER -d $POSTGRES_DB"
until pg_isready -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER -d $POSTGRES_DB; do
	echo "💤 Waiting for PostgreSQL to start..."
	sleep 1
done
echo "🚀 PostgreSQL is ready!"

echo "📦 Server Yarn Install..."
cd server && yarn && yarn && yarn build

echo "📦 Server DB Migrate & Seed..."
yarn db-migrate && yarn db-seed
cd ..

echo "📦 Client Yarn Install..."
cd client && yarn && yarn build:dev && cd ..


