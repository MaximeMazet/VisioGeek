# pull official base image
FROM node:14.15.0-buster



RUN apt-get -y update --fix-missing
RUN apt-get upgrade -y

# Install useful tools
RUN apt-get -y install apt-utils nano wget dialog curl software-properties-common gnupg spfquery
RUN apt-get -y install sudo

WORKDIR /var/www/html


# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install

EXPOSE 4201

# start app
CMD ["npm", "start"]