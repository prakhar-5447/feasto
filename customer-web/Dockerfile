# -------- Stage 1: Build --------
FROM node:24 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# -------- Stage 2: Run --------
FROM node:24-slim

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 4200

CMD ["npm", "run", "serve:ssr:customer-web"]