CREATE TYPE node_type AS ENUM ('file', 'folder');
CREATE TABLE IF NOT EXISTS system_nodes (
   id serial PRIMARY KEY,
   icon VARCHAR(50) NOT NULL,
   name VARCHAR(50) NOT NULL,
   type node_type NOT NULL,
   parent serial NOT NULL,
   content TEXT
);

CREATE TABLE IF NOT EXISTS technologies (
   id serial PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   icon VARCHAR(50) NOT NULL,
   experience VARCHAR(50) NOT NULL
);

COPY system_nodes FROM '/docker-entrypoint-initdb.d/system_nodes.csv' csv header;
COPY technologies FROM '/docker-entrypoint-initdb.d/technologies.csv' csv header;