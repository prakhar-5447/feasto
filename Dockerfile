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

# install prod deps
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# copy build output
COPY --from=builder /app/dist ./dist

# ✅ IMPORTANT: copy .env into final image
COPY .env .env

# expose port
EXPOSE 4000

# start server
CMD ["npm", "run", "serve:ssr:feasto-frontend"]