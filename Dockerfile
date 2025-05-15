FROM docker.io/httpd:alpine3.20
COPY dist/umpire-quiz/browser /usr/local/apache2/htdocs/
COPY dist/umpire-quiz/browser/en/img /usr/local/apache2/htdocs/img
RUN rm /usr/local/apache2/htdocs/en/env_local.json \
    && rm /usr/local/apache2/htdocs/en/env_local_mock.json \
    && rm /usr/local/apache2/htdocs/nl/env_local.json \
    && rm /usr/local/apache2/htdocs/nl/env_local_mock.json
COPY --chmod=777 start.sh /root/start.sh
RUN dos2unix /root/start.sh # convert line endings: dos to unix
ENTRYPOINT ["/root/start.sh"]
