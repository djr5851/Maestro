const http = require('http');
const url = require('url');
const query = require('querystring');
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
    '/js/PIXI.TextInput.js': htmlHandler.getPixiTextInput,
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
    '/saveSong': jsonHandler.saveSong,
    '/loadSongs': jsonHandler.loadSongs,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/loadSongs': jsonHandler.loadSongsMeta,
    notFound: jsonHandler.notFoundMeta,
  },
};

// handle POST requests
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/saveSong') {
    const body = [];
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = JSON.parse(bodyString);

      jsonHandler.saveSong(request, response, bodyParams);
    });
  }
};

// handle GET requests
const handleGet = (request, response, parsedUrl, params) => {
  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response, params);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else {
    handleGet(request, response, parsedUrl, params);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
