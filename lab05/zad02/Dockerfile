FROM node
WORKDIR /app
COPY ./app /app
RUN npm install
ENV MY_VARIABLE 5
EXPOSE 3000
CMD ["npm", "start"]