#!/bin/bash
docker stop discord-torn-bot &&
docker container rm discord-torn-bot &&
docker build -t discord-torn-bot:1 . &&
docker run -it --name=discord-torn-bot  discord-torn-bot:1