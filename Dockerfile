FROM harbor.zdwelink.com/welink/nginx:1.23.1
# LABEL author="bwrong"
COPY dist/ /usr/share/nginx/html/
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# WORKDIR /usr/share/nginx/html/
EXPOSE 80
