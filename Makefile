.PHONY: client
.PHONY: server

default:
	docker compose -f deployments/compose/portfolio-prod/docker-compose.yml up $(args) 
dev:
	docker compose -f deployments/compose/portfolio-dev/docker-compose.yml up $(args)
client-build:
	cd client && yarn build
client-server:
	cd client && yarn dev

