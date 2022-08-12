FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 3001
CMD ["npm", "run", "start:docker"]