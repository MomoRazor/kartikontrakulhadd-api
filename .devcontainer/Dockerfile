FROM node:22-bullseye-slim

ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then groupmod --gid $USER_GID node && usermod --uid $USER_UID --gid $USER_GID node; fi
RUN apt update
RUN apt install -y git
