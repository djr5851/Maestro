const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/index.html`);
const css = fs.readFileSync(`${__dirname}/../client/css/styles.css`);
const main = fs.readFileSync(`${__dirname}/../client/js/main.js`);
const classes = fs.readFileSync(`${__dirname}/../client/js/classes.js`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getMain = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/javascript' });
    response.write(main);
    response.end();
};

const getClasses = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/javascript' });
    response.write(classes);
    response.end();
};
  
module.exports = {
  getIndex,
  getCSS,
  getMain,
  getClasses
};
