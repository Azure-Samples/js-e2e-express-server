// add unique timestamp to filename
const timeStamp = () => {
  const date = new Date();
  return date.getTime();
};
const binaryParser = (res, callback) => {
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
const ignoreFavicon = (req, res, next) => {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end();
  }
  next();
};
const appLogger = (req, res, next) => {
  const srcIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const {method} = req;
  const {url} = req;
  const status = res.statusCode;

  console.log(`${srcIp} - ${method} ${url} ${status}`);

  next();
};
const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};
// Route not found (404)
const clientError404Handler = (req, res) =>res.status(404).send(`Cannot GET ${req.url}`);
const clientError500Handler = (err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
};
const errorHandler = (err, req, res) => {
  res.status(500);
  res.render('error', { error: err });
};

module.exports = {
  timeStamp,
  binaryParser,
  ignoreFavicon,
  appLogger,
  logErrors,
  clientError500Handler,
  clientError404Handler,
  errorHandler,
};
