FROM php:8.1.12-fpm

# Install required PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /var/www/html

# Copy project files to working directory
COPY . .

# Install project dependencies
RUN composer install --no-dev

# Expose port 9000 and start PHP-FPM server
EXPOSE 9000
CMD ["php-fpm"]
