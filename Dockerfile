FROM node
WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/
COPY . /app/
RUN npm install
VOLUME [ "/node_modules" ]
EXPOSE $PORT
CMD [ "npm","start" ]