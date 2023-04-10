FROM php:8.1-fpm

RUN apt-get update && \
    apt-get install -y git && \
    apt-get install -y curl unzip libzip-dev && \
    docker-php-ext-install pdo_mysql zip bcmath && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn

WORKDIR /var/www/html

COPY . .
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install && \
    yarn && \
    yarn build && \
    cp .env.example .env && \
    php artisan key:generate

CMD ["php-fpm"]

EXPOSE 9000
