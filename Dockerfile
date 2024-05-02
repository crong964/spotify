FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "./dist/server.js"]
EXPOSE 8000