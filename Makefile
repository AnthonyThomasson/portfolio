default:
	docker compose -f deployments/portfolio-dev/docker-compose.yml up $(args)
prod:
	docker compose -f deployments/portfolio-prod/docker-compose.yml up $(args)

