FROM gplane/pnpm AS builder

WORKDIR /app

COPY . .

ARG API

RUN pnpm i \
  && make API=$API

FROM nginx

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist .

EXPOSE 80