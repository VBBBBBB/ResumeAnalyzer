FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# Run in dev mode with --host to allow network access from the container to the host
CMD ["npm", "run", "dev", "--", "--host"]
