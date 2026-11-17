#!/bin/sh
set -e

cd /var/www/html

# Listen on the platform port
PORT="${PORT:-10000}"
sed -i "s/Listen 80$/Listen ${PORT}/" /etc/apache2/ports.conf
sed -i "s/<VirtualHost \*:80>/<VirtualHost *:${PORT}>/" /etc/apache2/sites-available/000-default.conf

# Database SSL certificate
if [ -n "$DB_SSL_CA_CERT" ]; then
    printf '%s\n' "$DB_SSL_CA_CERT" > storage/db-ca.pem
    export MYSQL_ATTR_SSL_CA=/var/www/html/storage/db-ca.pem
fi

php artisan config:clear
php artisan storage:link || true

# Run migrations
php artisan migrate --force

# Seed demo data on empty database
if [ "$SEED_DEMO_DATA" = "true" ]; then
    USERS=$(php artisan tinker --execute='echo \App\Models\User::count();' | tail -n 1)
    if [ "$USERS" = "0" ]; then
        php artisan db:seed --force
    fi
fi

# Recreate seed images (ephemeral disk)
php artisan db:seed --class=AtelierImageSeeder --force

php artisan config:cache
chown -R www-data:www-data storage bootstrap/cache

exec apache2-foreground
