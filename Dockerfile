FROM php:7.4-apache

RUN docker-php-ext-install pdo_mysql

COPY . /var/www/html

RUN chown -R www-data:www-data /var/www/html \
    && a2enmod rewrite
