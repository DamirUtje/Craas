# craas
NORDAKADEMIE Master Project

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites

What things you need to install the software and how to install them

Install Angular https://angular.io/guide/quickstart
#### Git 
* Download: https://git-scm.com/downloads
* Check if installed:
```
git --version
```
#### NodeJs and NPM
* Download: https://nodejs.org/en/download/
* Install (Debian based Linux command) node and npm:
```
sudo apt install nodejs npm
```
* Check if installed: 
```
node --version
```
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
### Build

Navigate to the frontend folder and execute

```
ng build --prod
```
prod = production mode
