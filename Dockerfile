FROM node

WORKDIR /usr/src/app

COPY . .

RUN npm install --silent

EXPOSE 5432

CMD ["npm", "start"]