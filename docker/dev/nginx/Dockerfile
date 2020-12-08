FROM php:7.3-fpm-buster

RUN apt-get -y update --fix-missing
RUN apt-get upgrade -y

# Install useful tools
RUN apt-get -y install apt-utils nano wget dialog curl software-properties-common gnupg spfquery
RUN apt-get -y install sudo 


RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install mysqli
RUN docker-php-ext-install tokenizer

RUN docker-php-ext-install gettext

RUN apt-get update && apt-get install -y --no-install-recommends \
        git \
        zlib1g-dev \
        libxml2-dev \
        libzip-dev \
    && docker-php-ext-install \
        pdo_mysql \
        zip

RUN docker-php-ext-install bcmath


# Install useful cron
RUN apt-get -y install cron

# Install important libraries
RUN apt-get -y install --fix-missing apt-utils build-essential git curl libcurl4 libcurl3-dev zip openssl ffmpeg

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

ARG USER=docker
ARG UID=1000
ARG GID=1000
ARG PW=logipro

RUN useradd -m ${USER} --uid=${UID} && echo "${USER}:${PW}" | \
      chpasswd


RUN apt-get install -y nginx

COPY start.sh /home/

RUN chown docker:docker /home/start.sh
RUN chmod +x /home/start.sh

## add permissions for nginx user
RUN chown -R ${USER}:${USER} /usr/share/nginx && chmod -R 755 /usr/share/nginx && \
        chown -R ${USER}:${USER} /var/lib/nginx && \
        chown -R ${USER}:${USER} /var/log/nginx && \
        chown -R ${USER}:${USER} /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R ${USER}:${USER} /var/run/nginx.pid
RUN composer global require laravel/installer


USER ${USER}

WORKDIR /var/www/html

CMD [ "/home/start.sh" ]