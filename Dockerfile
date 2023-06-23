FROM node:14 as builder
WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . .
RUN npm run build

FROM asia.gcr.io/nm-stg-asne1-lse/br2-console:base-ubuntu
WORKDIR /app

COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/dist /app/dist/
COPY --from=builder /app/config /app/config/
COPY --from=builder /app/node_modules /app/node_modules/

EXPOSE 4000
CMD ["npm", "run", "start"]