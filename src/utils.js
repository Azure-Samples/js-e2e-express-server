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
const getActualRequestDurationInMilliseconds = (start) => {
  const NS_PER_SEC = 1e9; //  convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
const appLogger = (req, res, next) => {
  const src_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const method = req.method;
  const url = req.url;

  const start = process.hrtime();

  res.on('finish', function () {
    const status = res.statusCode;
    const processTimeMs = getActualRequestDurationInMilliseconds(start);
    const log = `${src_ip} - ${method} ${url} ${status} ${processTimeMs.toLocaleString()} ms`;
    console.log(log, { url, status, processTimeMs, src_ip });
  });
  next();
};
const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};
const clientErrorHandler = (err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
};
const errorHandler = (err, req, res, next) => {
  res.status(500);
  res.render('error', { error: err });
};

module.exports = {
  timeStamp,
  binaryParser,
  ignoreFavicon,
  appLogger,
  logErrors,
  clientErrorHandler,
  errorHandler,
};
