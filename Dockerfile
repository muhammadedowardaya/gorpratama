FROM php:7.4-apache

# Install required extensions
RUN docker-php-ext-install pdo pdo_mysql

# Set document root
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# Enable mod_rewrite
RUN a2enmod rewrite

# Copy application files to container
COPY . /var/www/html

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Set environment variables
ENV DB_CONNECTION=mysql
ENV DB_HOST=containers-us-west-52.railway.app
ENV DB_PORT=5988
ENV DB_DATABASE=railway
ENV DB_USERNAME=root
ENV DB_PASSWORD=Cl0mKrcTylUsHSrt1YvT

# Expose port 80
EXPOSE 80
