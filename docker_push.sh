#!/bin/bash
./docker_build.sh &&
./docker_tag.sh &&
echo 'pushing docker.io/jizacal/discord-torn-bot:latest' &&
docker push docker.io/jizacal/discord-torn-bot:latest