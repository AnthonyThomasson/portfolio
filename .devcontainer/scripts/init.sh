# App - Remove local env file
if [ -f "./.env.local" ]; then
  rm ./.env.local
fi

cp ./.devcontainer/.env.dev ./.env.local
cp ./.devcontainer/.env.dev ./server/.env
cp ./.devcontainer/.env.dev ./client/.env
