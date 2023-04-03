# Set the base image to PHP 7.4
FROM php:7.4-apache

# Copy the contents of the local directory to the container
COPY . /var/www/html

# Install required PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Set the working directory to the Laravel application directory
WORKDIR /var/www/html

# Copy the .env.example file and create the .env file
COPY .env.example .env

# Generate a new Laravel application key
RUN php artisan key:generate

# Set permissions for the storage and bootstrap cache directories
RUN chmod -R 777 storage bootstrap/cache

# Expose port 80 for HTTP traffic
EXPOSE 80
