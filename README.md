# Craas
NORDAKADEMIE Master Project for zapliance

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Angular Prerequisites

What things you need to install the software and how to install them. See also https://angular.io/guide/quickstart. Instructions for Debian based Linux OS. Please note the the logged in user has sudo privileges.
#### Git 
* Download
https://git-scm.com/downloads
* Install
```
sudo apt-get install git
```
* Check if installed
```
git --version
```
#### NodeJs and NPM
* Download
https://nodejs.org/en/download/
* Install
For older Linux distribution please see: https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/

```
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt-get install nodejs
```
* Check if installed
```
node --version
npm --version
```
Nodejs version output should be greater or equal than v11.6.*
 If this is not the case, try:
```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```
#### Install Craas dependencies
* Angular Cli 
```
npm install -g @angular/cli
```
g = globally

* Angular Devkit
```
npm install @angular-devkit/build-angular --save
```
save = last save release version

* Angular Material
```
npm install angular-material --save
```

* JavaScript Pdf
```
npm install @types/jspdf --save
```
### Development

Navigate to the frontend folder and execute

```
npm start
```
### Build for production purposes

Navigate to the frontend folder and execute

```
ng build --prod
```
### Start in production

```
ng serve --proxy-config proxy.conf.json --prod
```


