const notFound = require('./not-found');
const internal = require('./internal');

module.exports = [notFound.notFoundPage, notFound.notFoundError, internal.internalError];