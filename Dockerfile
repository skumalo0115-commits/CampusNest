FROM nginx:alpine

ENV PORT=8080

COPY app/Pages /usr/share/nginx/html
COPY app/css /usr/share/nginx/html/css
COPY app/js /usr/share/nginx/html/js
COPY app/assets /usr/share/nginx/html/assets
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]