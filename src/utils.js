// add unique timestamp to filename
const timeStamp = () => {
    const date = new Date();
    return date.getTime();
};
const binaryParser = (res, callback) => {
    res.setEncoding('binary');
    res.data = '';
    res.on('data', function (chunk) {
        res.data += chunk;
    });
    res.on('end', function () {
        callback(null, Buffer.from(res.data, 'binary'));
    });
};

module.exports = {
    timeStamp,
    binaryParser
};