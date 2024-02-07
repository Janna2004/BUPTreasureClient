FROM node:18.16.0

# Create app directory
WORKDIR /app

# Install app dependencies
COPY . .

RUN npm cache clean --force
RUN npm config set registry https://registry.npmmirror.com
RUN npm install

ENV NODE_OPTIONS=--openssl-legacy-provider

EXPOSE 8080

CMD [ "npm", "run", "serve" ]
