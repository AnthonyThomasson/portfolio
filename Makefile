default:
	docker compose -f deployments/dev/docker-compose.yml up
prod:
	docker compose -f deployments/prod/docker-compose.yml up

