const fs = require('fs');
const path = require('path');

const loadFile = (request, response, filePath, fileType) => {
  const file = path.resolve(__dirname, filePath);

  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404);
      }
      return response.end(err);
    }

    let { range } = request.headers;

    if (!range) {
      range = 'bytes=0-';
    }

    const positions = range.replace(/bytes=/, '').split('-');

    let start = parseInt(positions[0], 10);

    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) {
      start = end - 1;
    }

    const chunksize = (end - start) + 1;

    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': fileType,
    });

    const stream = fs.createReadStream(file, { start, end });

    stream.on('open', () => {
      stream.pipe(response);
    });

    stream.on('error', (streamErr) => {
      response.end(streamErr);
    });

    return stream;
  });
};

const getA1 = (request, response) => {
  loadFile(request, response, '../client/sounds/A1.wav', 'audio/wav');
};
const getAb1 = (request, response) => {
  loadFile(request, response, '../client/sounds/Ab1.wav', 'audio/wav');
};

const getB1 = (request, response) => {
  loadFile(request, response, '../client/sounds/B1.wav', 'audio/wav');
};

const getBb1 = (request, response) => {
  loadFile(request, response, '../client/sounds/Bb1.wav', 'audio/wav');
};

const getC1 = (request, response) => {
  loadFile(request, response, '../client/sounds/C1.wav', 'audio/wav');
};

const getC2 = (request, response) => {
  loadFile(request, response, '../client/sounds/C2.wav', 'audio/wav');
};

const getD1 = (request, response) => {
  loadFile(request, response, '../client/sounds/D1.wav', 'audio/wav');
};

const getD2 = (request, response) => {
  loadFile(request, response, '../client/sounds/D2.wav', 'audio/wav');
};

const getDb1 = (request, response) => {
  loadFile(request, response, '../client/sounds/Db1.wav', 'audio/wav');
};

const getDb2 = (request, response) => {
  loadFile(request, response, '../client/sounds/Db2.wav', 'audio/wav');
};

const getE1 = (request, response) => {
  loadFile(request, response, '../client/sounds/E1.wav', 'audio/wav');
};

const getE2 = (request, response) => {
  loadFile(request, response, '../client/sounds/E2.wav', 'audio/wav');
};

const getEb1 = (request, response) => {
  loadFile(request, response, '../client/sounds/Eb1.wav', 'audio/wav');
};

const getEb2 = (request, response) => {
  loadFile(request, response, '../client/sounds/Eb2.wav', 'audio/wav');
};

const getF1 = (request, response) => {
  loadFile(request, response, '../client/sounds/F1.wav', 'audio/wav');
};

const getG1 = (request, response) => {
  loadFile(request, response, '../client/sounds/G1.wav', 'audio/wav');
};

const getGb1 = (request, response) => {
  loadFile(request, response, '../client/sounds/Gb1.wav', 'audio/wav');
};

const getGame = (request, response) => {
  loadFile(request, response, '../client/images/game.png', 'image/png');
};
const getWhiteNote = (request, response) => {
  loadFile(request, response, '../client/images/WhiteNote.png', 'image/png');
};
const getBlackNote = (request, response) => {
  loadFile(request, response, '../client/images/BlackNote.png', 'image/png');
};
const getMenuBG = (request, response) => {
  loadFile(request, response, '../client/images/menuBG.jpg', 'image/jpeg');
};
const getInstructionsBG = (request, response) => {
  loadFile(request, response, '../client/images/instructionsBG.jpg', 'image/jpeg');
};
const getWhiteKeyPress = (request, response) => {
  loadFile(request, response, '../client/images/WhiteKeyPress.png', 'image/png');
};
const getBlackKeyPress = (request, response) => {
  loadFile(request, response, '../client/images/BlackKeyPress.png', 'image/png');
};

module.exports = {
  getA1,
  getAb1,
  getB1,
  getBb1,
  getC1,
  getC2,
  getD1,
  getD2,
  getDb1,
  getDb2,
  getE1,
  getE2,
  getEb1,
  getEb2,
  getF1,
  getG1,
  getGb1,
  getGame,
  getWhiteNote,
  getBlackNote,
  getMenuBG,
  getInstructionsBG,
  getWhiteKeyPress,
  getBlackKeyPress,
};
