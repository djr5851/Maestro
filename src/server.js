const http = require('http');
const url = require('url');
// const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/css/styles.css': htmlHandler.getCSS,
    '/js/main.js': htmlHandler.getMain,
    '/js/classes.js': htmlHandler.getClasses,
    '/sounds/A1.wav': mediaHandler.getA1,
    '/sounds/Ab1.wav': mediaHandler.getAb1,
    '/sounds/B1.wav': mediaHandler.getB1,
    '/sounds/Bb1.wav': mediaHandler.getBb1,
    '/sounds/C1.wav': mediaHandler.getC1,
    '/sounds/C2.wav': mediaHandler.getC2,
    '/sounds/D1.wav': mediaHandler.getD1,
    '/sounds/D2.wav': mediaHandler.getD2,
    '/sounds/Db1.wav': mediaHandler.getDb1,
    '/sounds/Db2.wav': mediaHandler.getDb2,
    '/sounds/E1.wav': mediaHandler.getE1,
    '/sounds/E2.wav': mediaHandler.getE2,
    '/sounds/Eb1.wav': mediaHandler.getEb1,
    '/sounds/Eb2.wav': mediaHandler.getEb2,
    '/sounds/F1.wav': mediaHandler.getF1,
    '/sounds/G1.wav': mediaHandler.getG1,
    '/sounds/Gb1.wav': mediaHandler.getGb1,
    '/images/game.png': mediaHandler.getGame,
    '/images/WhiteNote.png': mediaHandler.getWhiteNote,
    '/images/BlackNote.png': mediaHandler.getBlackNote,
    '/images/menuBG.jpg': mediaHandler.getMenuBG,
    '/images/instructionsBG.jpg': mediaHandler.getInstructionsBG,
    '/images/WhiteKeyPress.png': mediaHandler.getWhiteKeyPress,
    '/images/BlackKeyPress.png': mediaHandler.getBlackKeyPress,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
  },
};

const handlePost = () => {};

// handle GET requests
const handleGet = (request, response, parsedUrl) => {
  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else {
    handleGet(request, response, parsedUrl);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
