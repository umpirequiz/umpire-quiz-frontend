FROM docker.io/httpd:alpine3.20
COPY --chmod=700 EnvironmentEval.sh /root/EnvironmentEval.sh
COPY dist/umpire-quiz/browser /usr/local/apache2/htdocs/
RUN rm /usr/local/apache2/htdocs/env_local.json

CMD "/root/EnvironmentEval.sh"
