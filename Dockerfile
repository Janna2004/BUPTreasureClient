FROM node:18.16.0

# Create app directory
WORKDIR /app

# Install app dependencies
COPY . .

RUN npm install

ENV NODE_OPTIONS=--openssl-legacy-provider

EXPOSE 8080

CMD [ "npm", "run", "serve" ]
