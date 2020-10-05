const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/index.html`);
const css = fs.readFileSync(`${__dirname}/../client/css/styles.css`);
const main = fs.readFileSync(`${__dirname}/../client/js/main.js`);
const classes = fs.readFileSync(`${__dirname}/../client/js/classes.js`);
const pixiTextInput = fs.readFileSync(`${__dirname}/../client/js/PIXI.TextInput.js`);

const get = (response, content, contentType) => {
  response.writeHead(200, { 'Content-Type': contentType });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => { get(response, index, 'text/html'); };

const getCSS = (request, response) => { get(response, css, 'text/css'); };

const getMain = (request, response) => { get(response, main, 'text/javascript'); };

const getClasses = (request, response) => { get(response, classes, 'text/javascript'); };

const getPixiTextInput = (request, response) => { get(response, pixiTextInput, 'text/javascript'); };

module.exports = {
  getIndex,
  getCSS,
  getMain,
  getClasses,
  getPixiTextInput,
};
