FROM node

RUN npm install yarn -g

# create app directory
WORKDIR /src


#install dependencies
COPY . .
RUN yarn --production
ENV NODE_ENV=development

EXPOSE 4000

RUN ls

CMD ["npm", "start"]


