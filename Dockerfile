FROM nginx
LABEL author="bwrong"
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html/
EXPOSE 80