FROM node:21.7.1-alpine3.19 AS builder
ENV NODE_OPTIONS=--openssl-legacy-provider
COPY . /app
WORKDIR /app/
RUN npm install
RUN npm run build


FROM nginx:alpine3.19

COPY --from=builder /app/out/ /usr/share/nginx/html/
