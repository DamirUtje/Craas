# Craas
NORDAKADEMIE Master Project for zapliance

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites

What things you need to install the software and how to install them

Install Angular https://angular.io/guide/quickstart
#### Git 
* Download: https://git-scm.com/downloads
* Install (Debian based Linux command): 
```
sudo apt-get install git
```
* Check if installed:
```
git --version
```
#### NodeJs and NPM
* Download: https://nodejs.org/en/download/
* Install (Debian based Linux command) node and npm:

See also: https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/

```
sudo apt-get install nodejs
sudo apt-get install npm
```
* Check if installed: 

NodeJs
```
node --version
```
or
```
nodejs --version
```

npm
```
npm --version
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
npm install jsdpf --save
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


