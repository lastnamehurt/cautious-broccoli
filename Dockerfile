FROM cypress/included:10.4.0

WORKDIR /app

COPY ./cypress ./cypress
COPY ./cypress.config.js ./cypress.config.js
COPY package.json package.json

RUN npm i
RUN npx cypress run
