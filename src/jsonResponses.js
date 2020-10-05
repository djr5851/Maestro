const songs = {};

// function to send response with body
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, {
    'Content-Type': 'application/json',
  });
  response.write(JSON.stringify(object));
  response.end();
};

// function to send response header
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, {
    'Content-Type': 'application/json',
  });
  response.end();
};

// function to request songs
const loadSongs = (request, response, params) => {
  const responseJSON = {
    songs,
  };

  console.dir(params);

  return respondJSON(request, response, 200, responseJSON);
};

// function to request song metadata
const loadSongsMeta = (request, response) => respondJSONMeta(request, response, 200);

// function to add a song from a POST body
const saveSong = (request, response, body) => {
  const responseJSON = {
    message: 'Song title required',
  };

  if (!body.name) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // assume song doesnt already exist with created response 201
  let responseCode = 201;

  // if song name exists change to update response 204
  if (songs[body.name]) {
    responseCode = 204;
  } else {
    songs[body.name] = {};
    songs[body.name].name = body.name;
  }

  songs[body.name].notes = body.notes;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  // no body for update response
  return respondJSONMeta(request, response, responseCode);
};

// function to show not found error with body
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  return respondJSON(request, response, 404, responseJSON);
};

// function to show not found header
const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
  notFound,
  notFoundMeta,
  loadSongs,
  loadSongsMeta,
  saveSong,
};
