eval "echo \"$(cat /usr/local/apache2/htdocs/env.json)\"" > /usr/local/apache2/htdocs/env.json
/usr/local/bin/httpd-foreground
