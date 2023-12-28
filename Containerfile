FROM node

ENV NODE_ENV dev
WORKDIR /usr/src/app
COPY . .
RUN npm ci

USER node

EXPOSE 3001

CMD node src/index.js
