ARG NODE_VERSION=12

FROM node:${NODE_VERSION}-alpine

RUN mkdir -p /srv
WORKDIR /srv

COPY package.json yarn.lock /srv/
RUN yarn install

COPY . /srv
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]