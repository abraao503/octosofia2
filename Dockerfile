FROM node

WORKDIR /usr/src/app

COPY . .

RUN npm install --silent

EXPOSE 3333

ENTRYPOINT ["/bin/bash", "./entrypoint.sh" ]