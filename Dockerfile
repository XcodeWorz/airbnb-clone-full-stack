FROM node

RUN npm install nodemon -g

WORKDIR /airbnb-clone

COPY ./package.json .
COPY ./packages/server/package.json ./packages/server/
COPY ./packages/common/package.json ./packages/common/

RUN npm i -g yarn
RUN yarn install

COPY ./packages/server/dist ./packages/server/
COPY ./packages/common/dist ./packages/common/

WORKDIR ./packages/server/src

ENV NODE_ENV development

EXPOSE 4000

RUN ls

CMD ["nodemon", "index.js", "--exec babel-node"]