FROM alpine

RUN apk update && apk add nginx nodejs yarn

WORKDIR /app

COPY . .

RUN yarn && yarn build-prod && ln -sf /app/dist /var/www/localhost/htdocs/app

WORKDIR /etc/nginx/http.d

RUN echo 'server {\
        listen 3355;\
        listen [::]:3355;\
        root /var/www/localhost/htdocs/app;\
        index index.html;\
        server_name localhost;\
}\
' > default.conf && nginx

CMD [ "nginx", "-g", "daemon off;" ]

EXPOSE 3355