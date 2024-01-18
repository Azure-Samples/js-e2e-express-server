// add unique timestamp to filename
export const timeStamp = () => {
  const date = new Date();
  return date.getTime();
};

export const binaryParser = (res, callback) => {
  res.setEncoding('binary');
  res.data = '';
  res.on('data', (chunk) => {
    res.data += chunk;
  });
  res.on('end', () => {
    callback(null, Buffer.from(res.data, 'binary'));
  });
};

// ignore request for FavIcon. so there is no error in browser
export const ignoreFavicon = (req, res, next) => {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end();
  }
  next();
};

export const appLogger = (req, res, next) => {
  const srcIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const {method} = req;
  const {url} = req;
  const status = res.statusCode;

  console.log(`${srcIp} - ${method} ${url} ${status}`);

  next();
};

export const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

// Route not found (404)
export const clientError404Handler = (req, res) => res.status(404).send(`Cannot GET ${req.url}`);

export const clientError500Handler = (err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
};

export const errorHandler = (err, req, res) => {
  res.status(500);
  res.render('error', { error: err });
};