FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye

# Install Docker CLI
RUN apt-get update && \
	apt-get install -y docker.io postgresql-client-13 postgresql-client-common

RUN mkdir -p /workspaces/portfolio
WORKDIR /workspaces/portfolio
