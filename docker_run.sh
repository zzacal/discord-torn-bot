# /bin/bash
docker stop discord-torn-bot || true &&
docker container rm discord-torn-bot || true &&
./build_docker.sh &&
docker run -d --name=discord-torn-bot \
    -e DISCORD_TOKEN=$DISCORD_TOKEN \
    -e GIPHY_KEY=$GIPHY_KEY \
    discord-torn-bot:dev