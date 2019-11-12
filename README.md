# Simple client side application

Client side web application displays advertisement report data in pie chart (rendered by D3JS library).

Project is bundled by **Webpack 4** and is written in **Vanilla JavaScript ES6 (No Frameworks)**.
To build, test and optimize project, several dependencies has been used:
* [Babel](https://babeljs.io/) - to turn ES6 code into ES5 
* [Mocha](https://mochajs.org/) + [Chai](https://www.chaijs.com/) - to create unit tests
* [D3.js](https://d3js.org/) - JavaScript library to produce line and pie chart in svg
* [Dev Server](https://github.com/webpack/webpack-dev-server) - to quickly develop an application. Provides live reloading (development only)
* [Clean Webpack plugin](https://github.com/johnagan/clean-webpack-plugin) - to clean `dist/` folder before build
* [Html Webpack plugin](https://webpack.js.org/plugins/html-webpack-plugin/) - to serve HTML files
* [Mini CSS plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) - to extract and minify css files
* [Zip Webpack plugin](https://www.npmjs.com/package/zip-webpack-plugin) - to zip up whole project into `release.zip`

To run project, check that you have [NodeJS](https://nodejs.org/en/) installed.

Firstly, we need to install dependendies for the node project:
```
npm install
```

## Development build

To watch over changes and rebuild project on change. Rebuilded project in development is not minified.
```
npm run build:dev
```

## Production build

To build project for production. Also, all files are minified and packed into zip file `dist/release.zip`.
```
npm run build
```

## Start (development) server

To start http server run 
```
npm start
```

Project is running at `http://localhost:8080/`

## Run unit tests

To run all test defined in `test/*` folder, run 
```
npm run test
```
