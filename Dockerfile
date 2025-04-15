FROM node:18
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]