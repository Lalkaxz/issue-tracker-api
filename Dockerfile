FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

RUN npx prisma generate
RUN npx prisma db push
RUN npm run build

CMD [ "npm", "run", "start" ]

