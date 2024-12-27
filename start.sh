#!/bin/sh
set -e  # Exit on any error
set -x  # Debugging: Show commands as they are executed

# Process env.json with substituted environment variables
eval "echo \"$(cat /usr/local/apache2/htdocs/env.json)\"" > /usr/local/apache2/htdocs/env.json

# Start the Apache server
exec /usr/local/bin/httpd-foreground
