FROM node

WORKDIR /usr/src/app

COPY . .

RUN npm install --silent

EXPOSE 5432

EXPOSE 3333

CMD ["npm", "start"]